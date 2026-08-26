import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { Student } from "@/types/student";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import StudentTableActions from "../../components/StudentTableActions/StudentTableActions";

interface StudentTableProps {
  students: Student[];
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function StudentTable({
  students,
  onView,
  onEdit,
  onDelete,
}: StudentTableProps) {
  const columns: GridColDef<Student>[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 160,
      valueGetter: (_, row) => `${row.firstName} ${row.lastName}`,
    },
    { field: "email", headerName: "Email", flex: 1.2, minWidth: 200 },
    { field: "course", headerName: "Course", flex: 0.8, minWidth: 120 },
    {
      field: "status",
      headerName: "Status",
      flex: 0.7,
      minWidth: 120,
      renderCell: (params) => <StatusBadge status={params.row.status} />,
    },
    {
      field: "score",
      headerName: "Score",
      flex: 0.5,
      minWidth: 90,
      type: "number",
      valueFormatter: (value: number) => `${value}%`,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.8,
      minWidth: 140,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <StudentTableActions
          onView={() => onView(params.row.id)}
          onEdit={() => onEdit(params.row.id)}
          onDelete={() => onDelete(params.row.id)}
        />
      ),
    },
  ];

  if (students.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <Typography color="#94a3b8">No students found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#1e293b", borderRadius: 2 }}>
      <DataGrid
        rows={students}
        columns={columns}
        pageSizeOptions={[5, 10, 25]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        disableRowSelectionOnClick
        sx={{
          border: "none",
          color: "white",
          "& .MuiDataGrid-columnHeaders": { backgroundColor: "#334155" },
          "& .MuiDataGrid-cell": { borderColor: "#334155" },
          "& .MuiDataGrid-footerContainer": { borderColor: "#334155" },
        }}
      />
    </Box>
  );
}