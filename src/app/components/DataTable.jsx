"use client";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

function DataTable({
  rows,
  columns,
  initialState,
  style,
  tableWidth = "100%",
}) {
  return (
    <Paper
      sx={{ width: tableWidth }}
      className="font-bold"
      data-testid="data-table"
    >
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={initialState}
        className="font-bold"
        disableColumnResize
        disableRowSelectionOnClick
        pageSizeOptions={[5, 10]}
        sx={style}
      />
    </Paper>
  );
}

export default DataTable;
