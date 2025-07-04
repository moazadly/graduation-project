"use client";
import {
  Box,
  Button,
  IconButton,
  Menu,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import stars from "../assets/images/icon-start 1.png";
import { useEffect, useState } from "react";
import { useGetCollocationsQuery } from "../redux/collocationApi";
import InfoIcon from "@mui/icons-material/Info";
import DataTable from "./DataTable";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";
import DataTableSkeleton from "./DataTableSkeleton";
import { usePostPredictMutation } from "../redux/wordBeforeAfter";
import { streamGradioEvent } from "../redux/streamForWordBeforeAfter";

const paginationModel = { page: 0, pageSize: 5 };

function BeforeAfterResults() {
  const searchParams = useSearchParams();

  const [word, setWord] = useState("");
  const [dataLoading, setDataLoading] = useState(false);
  const [postPredict] = usePostPredictMutation();
  const [beforeRows, setBeforeRows] = useState();
  const [afterRows, setAfterRows] = useState();
  const formattedDataAfter = (data) => {
    const formattedData = data.map((item, index) => {
      const [word, after] = item.prediction.split(" ");
      return {
        id: index + 1,
        word: word,
        after: after || "...",
        percent: `${Math.ceil(item.score * 100)}%`,
      };
    });
    return formattedData;
  };
  const formattedDataBefore = (data) => {
    const formattedData = data.map((item, index) => {
      const [before, word] = item.prediction.split(" ");
      return {
        id: index + 1,
        word: word,
        before: before || "...",
        percent: `${Math.ceil(item.score * 100)}%`,
      };
    });
    return formattedData;
  };
  const getResult = async (word) => {
    try {
      console.log(word);
      setDataLoading(true);
      const response = await postPredict(word).unwrap();
      console.log(response);
      const eventId = response?.event_id || response?.data?.[0];
      console.log(eventId);
      if (!eventId) {
        return;
      }

      let buffer = "";

      await streamGradioEvent(
        eventId,
        (chunk) => {
          buffer += chunk;

          // Look for complete `data:` lines
          const lines = buffer.split("\n");
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const jsonString = line.slice(6); // remove "data: "
              try {
                const parsed = JSON.parse(jsonString);

                const beforePredictions = formattedDataBefore(
                  parsed[0]?.predictions?.mask_at_start
                );
                const afterPredictions = formattedDataAfter(
                  parsed[0]?.predictions?.mask_at_end
                );

                if (beforePredictions && afterPredictions) {
                  console.log(
                    "✅ Arabic beforePredictions:",
                    beforePredictions
                  ); // will display correctly
                  console.log("✅ Arabic afterPredictions:", afterPredictions); // will display correctly
                  setBeforeRows(beforePredictions);
                  setAfterRows(afterPredictions);
                }
              } catch (e) {
                console.warn("Invalid JSON chunk:", jsonString);
              }
            }
          }
        },
        () => {
          console.log("✅ Stream ended");
        },
        (err) => {
          console.error("❌ Stream error:", err.message);
        }
      );
      setDataLoading(false);
    } catch (err) {}
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      let res = searchParams.get("word");
      if (res !== null && res.trim() !== "") {
        setWord(res);
        getResult(res);
      }
    }
  }, [searchParams.get("word")]);

  //   const {
  //     data: collocationsData,
  //     isLoading: collocationDataLoading,
  //     isError: collocationDataError,
  //     isSuccess: collocationDataRetreived,
  //   } = useGetCollocationsQuery(word);
  //   const [open, setOpen] = useState(null);
  //   const [anchorEl, setAnchorEl] = useState(null);
  //   const [copied, setCopied] = useState(false);

  const afterColumns = [
    {
      field: "word",
      headerName: "الكلمة",
      flex: 2,
      renderCell: (params) => (
        <div
          style={{
            color: "#004f3f",
            fontWeight: "bold",
            display: "flex",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "after",
      headerName: "اللواحق",
      flex: 2,
    },
    {
      field: "percent",
      headerName: "نسبة التكرار",
      flex: 2,
    },
  ];

  const beforeColumns = [
    {
      field: "percent",
      headerName: "نسبة التكرار",
      flex: 2,
    },
    {
      field: "before",
      headerName: "السوابق",
      flex: 2,
    },
    {
      field: "word",
      headerName: "الكلمة",
      flex: 2,
      renderCell: (params) => (
        <div
          style={{
            color: "#004f3f",
            fontWeight: "bold",
            display: "flex",
          }}
        >
          {params.value}
        </div>
      ),
    },
  ];

  if (!word) return;
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      mb={12}
      p={1.5}
    >
      <Stack
        direction={"row"}
        justifyContent={"center"}
        p={1}
        sx={{
          boxShadow: "0 0 6px 3px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px ",
          width: "100%",
        }}
      >
        <Box mr={1}>
          <Image src={stars} />
        </Box>

        <Typography fontSize={24} fontWeight={600}>
          {word}
        </Typography>
      </Stack>

      {dataLoading ? (
        <DataTableSkeleton />
      ) : (
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          p={1}
          sx={{
            width: "100%",
          }}
        >
          <Stack
            justifyContent={"center"}
            p={1}
            sx={{
              boxShadow: "0 0 6px 3px rgba(0, 0, 0, 0.1)",
              borderRadius: "12px ",
              width: "45%",
            }}
          >
            <DataTable
              rows={beforeRows}
              columns={beforeColumns}
              initialState={{ pagination: { paginationModel } }}
              style={{
                boxShadow: "none",
                border: 0,
                fontSize: "20px",
                textAlign: "center",

                "& .MuiDataGrid-cell": {
                  justifyContent: "start",
                  alignItems: "center",
                  px: 2,
                },
                "& .MuiDataGrid-columnHeader .MuiDataGrid-columnHeaderTitleContainer .MuiDataGrid-columnHeaderTitleContainerContent .MuiDataGrid-columnHeaderTitle":
                  {
                    fontWeight: "500",
                    fontSize: "24px",
                  },
              }}
            />
          </Stack>
          <Stack
            justifyContent={"center"}
            p={1}
            sx={{
              boxShadow: "0 0 6px 3px rgba(0, 0, 0, 0.1)",
              borderRadius: "12px ",
              width: "45%",
            }}
          >
            <DataTable
              rows={afterRows}
              columns={afterColumns}
              initialState={{ pagination: { paginationModel } }}
              style={{
                boxShadow: "none",
                border: 0,
                fontSize: "20px",
                textAlign: "center",

                "& .MuiDataGrid-cell": {
                  justifyContent: "start",
                  alignItems: "center",
                  px: 2,
                },
                "& .MuiDataGrid-columnHeader .MuiDataGrid-columnHeaderTitleContainer .MuiDataGrid-columnHeaderTitleContainerContent .MuiDataGrid-columnHeaderTitle":
                  {
                    fontWeight: "500",
                    fontSize: "24px",
                  },
              }}
            />
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}

export default BeforeAfterResults;
