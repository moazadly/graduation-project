import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
} from "@mui/material";

export default function TableSkeleton({ rows = 5, columns = 3 }) {
  return (
    <TableContainer
      component={Paper}
      sx={{ direction: "rtl" }}
      data-testid="data-table-skeleton"
    >
      <Table>
        <TableHead>
          <TableRow>
            {[...Array(columns)].map((_, index) => (
              <TableCell key={index} align="right">
                <Skeleton variant="text" width="60%" height={28} />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(rows)].map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {[...Array(columns)].map((_, colIndex) => (
                <TableCell key={colIndex} align="right">
                  <Skeleton variant="text" width="100%" height={20} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
