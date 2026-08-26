"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Box, Button, Typography } from "@mui/material";

import AppLayout from "@/components/Applayout/AppLayout";
import Loading from "@/components/Loading/Loading";
import ConfirmDialog from "@/components/ConfirmDialog/ConfirmDialog";
import StudentFilters from "@/components/StudentFilters/StudentFilters";
import StudentTable from "@/components/StudentTable/StudentTable";
import { useStudents } from "@/hooks/useStudents";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { EMPTY_FILTERS, filterStudents } from "@/app/library/studentFilters";

export default function StudentsPage() {
  useRequireAuth();
  const router = useRouter();
  const { students, loading, error, deleteStudent } = useStudents();

  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; name: string } | null>(null);

  const filteredStudents = useMemo(() => filterStudents(students, filters), [students, filters]);

  const handleDeleteConfirmed = async () => {
    if (!deleteTarget) return;
    try {
      await deleteStudent(deleteTarget.id);
      toast.success(`${deleteTarget.name} was deleted`);
    } catch {
      toast.error("Could not delete student. Please try again.");
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <AppLayout>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5">Students List</Typography>
        <Button variant="contained" color="success" onClick={() => router.push("/students/add")}>
          + Add Student
        </Button>
      </Box>

      <StudentFilters onChange={setFilters} />

      {loading ? (
        <Loading label="Loading students..." />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <StudentTable
          students={filteredStudents}
          onView={(id) => router.push(`/students/${id}`)}
          onEdit={(id) => router.push(`/students/${id}/edit`)}
          onDelete={(id) => {
            const student = students.find((s) => s.id === id);
            if (student) setDeleteTarget({ id, name: `${student.firstName} ${student.lastName}` });
          }}
        />
      )}

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete student"
        description={`Are you sure you want to delete ${deleteTarget?.name}?`}
        confirmLabel="Delete"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirmed}
      />
    </AppLayout>
  );
}