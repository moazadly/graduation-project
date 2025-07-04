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
import { Padding } from "@mui/icons-material";

const paginationModel = { page: 0, pageSize: 5 };

function CollocationsResult() {
  const searchParams = useSearchParams();
  const [word, setWord] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      let res = searchParams.get("word");
      setWord(res);
    }
  }, [searchParams.get("word")]);
  const [rows, setRows] = useState([]);
  const {
    data: collocationsData,
    isLoading: collocationDataLoading,
    isError: collocationDataError,
    isSuccess: collocationDataRetreived,
  } = useGetCollocationsQuery(word);
  const [open, setOpen] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleOpen = (e, id) => {
    setAnchorEl(e.currentTarget);
    setOpen(id);
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleClose = () => {
    setOpen(null);
    setAnchorEl(null);
    setCopied(false);
  };

  const columns = [
    {
      field: "info",
      headerName: "السياق السابق للكلمة",
      flex: 4,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={(e) => handleOpen(e, params.value.id)}
            title={"معلومات عن السياق"}
            sx={{
              color: "#004F3F",
              fontSize: 20,
              cursor: "pointer",
              transition: "0.3s",
              "&:hover": { color: "#00695c" },
            }}
          >
            <InfoIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open == params.value.id}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            MenuListProps={{
              onMouseLeave: handleClose,
              sx: { px: 2, py: 1.5 },
            }}
            PaperProps={{
              sx: {
                maxWidth: "50%",
                bgcolor: "#f9f9f9",
                boxShadow: 3,
              },
            }}
          >
            <Box sx={{ px: 1.5, py: 1 }}>
              <Box
                sx={{
                  textAlign: "right",
                  mb: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold", mr: 2 }}>
                  المصدر:
                </Typography>
                {params.value.source}
              </Box>
              <Box
                sx={{
                  textAlign: "left",
                  mb: 1,
                  display: "flex",
                  // alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", mr: 2, whiteSpace: "nowrap" }}
                >
                  السياق الكامل:
                </Typography>
                <Box>
                  {params.value.prev}
                  <span style={{ color: "#004f3f", fontWeight: "bold" }}>
                    {params.value.word}
                  </span>
                  {params.value.after}
                </Box>
                <IconButton
                  onClick={(e) =>
                    handleCopy(
                      params.value.prev +
                        " " +
                        params.value.word +
                        " " +
                        params.value.after
                    )
                  }
                  title={"نسخ السياق"}
                  sx={{
                    color: "#004F3F",
                    boxShadow: "none",
                    border: 0,
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                    fontSize: 20,
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
                >
                  {!copied ? <ContentCopyIcon /> : <DoneIcon />}
                </IconButton>
              </Box>
              <Button size="small" onClick={handleClose}>
                اغلاق
              </Button>
            </Box>
          </Menu>
          <span style={{ direction: "ltr", textAlign: "left" }}>
            {params.value.prev}
          </span>
        </>
      ),
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
            justifyContent: "center",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "after",
      headerName: "السياق اللاحق بالكلمة",
      flex: 4,
    },
  ];

  useEffect(() => {
    if (collocationDataRetreived && collocationsData?.data) {
      const formatted = collocationsData.data.map((collocation, index) => {
        const [prev, word, ...after] = collocation.highlight[0].split("$");
        return {
          id: index + 1,
          word: word,
          after: after || "...",
          info: {
            id: index,
            prev: prev || "...",
            word: word,
            after: after || "...",
            source: collocation.source,
          },
        };
      });
      setRows(formatted);
    } else if (
      collocationDataRetreived &&
      (!collocationsData?.data || collocationsData.data.length === 0)
    ) {
      setRows([]);
    }
  }, [collocationDataRetreived, collocationsData?.data]);

  // Guard: Don't render if no search word
  if (!word) {
    return <></>;
  }

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={8}
      mb={12}
      p={1.5}
    >
      <Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        p={1.5}
        sx={{
          boxShadow: "0 0 6px 3px rgba(0, 0, 0, 0.05)",
          borderRadius: "12px ",
          width: "100%",
        }}
        mb={10}
      >
        <Box mr={1}>
          <Image src={stars} />
        </Box>
        <Typography fontSize={24} fontWeight={600}>
          {word}
        </Typography>
      </Stack>
      {collocationDataLoading ? (
        <DataTableSkeleton data-testid="data-table-skeleton" />
      ) : collocationDataError ? (
        <Stack alignItems="center" mt={4}>
          <Typography color="error">
            حدث خطأ أثناء جلب البيانات. حاول مرة أخرى.
          </Typography>
        </Stack>
      ) : rows.length === 0 ? (
        <Stack alignItems="center" mt={4}>
          <Typography color="text.secondary">
            لا توجد نتائج متاحة لهذه الكلمة.
          </Typography>
        </Stack>
      ) : (
        <Stack
          direction={"column"}
          justifyContent={"center"}
          p={1}
          sx={{
            boxShadow: "0 0 6px 3px rgba(0, 0, 0, 0.05)",
            borderRadius: "12px ",
            width: "100%",
          }}
        >
          <DataTable
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            data-testid="data-table"
            style={{
              boxShadow: "none",
              border: 0,
              fontSize: "20px",
              textAlign: "center",
              "& .MuiDataGrid-cell": {
                justifyContent: "start",
                alignItems: "center",
              },
              "& .MuiDataGrid-columnHeader .MuiDataGrid-columnHeaderTitleContainer .MuiDataGrid-columnHeaderTitleContainerContent .MuiDataGrid-columnHeaderTitle":
                {
                  fontWeight: "500",
                  fontSize: "24px",
                },
              "& .MuiDataGrid-columnHeader[data-field='word'] .MuiDataGrid-columnHeaderTitleContainer":
                {
                  justifyContent: "center",
                },
            }}
          />
        </Stack>
      )}
    </Stack>
  );
}

export default CollocationsResult;
