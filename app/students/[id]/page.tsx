"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Box, Button, LinearProgress, Paper, Typography } from "@mui/material";

import AppLayout from "@/components/Applayout/AppLayout";
import Loading from "@/components/Loading/Loading";
import StatusBadge from "@/components/StatusBadge/StatusBadge";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { studentService } from "@/services/studentService";
import { Student } from "@/types/student";

export default function StudentDetailsPage() {
  useRequireAuth();
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      if (Number.isNaN(id)) {
        setStudent(null);
        setLoading(false);
        return;
      }
      try {
        const data = await studentService.getStudentById(id);
        setStudent(data ?? null);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  if (loading) {
    return (
      <AppLayout>
        <Loading />
      </AppLayout>
    );
  }

  if (!student) {
    return (
      <AppLayout>
        <h1>Student not found</h1>
        <Button onClick={() => router.push("/students")}>Back to Students</Button>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5">Student Details</Typography>
        <StatusBadge status={student.status} />
      </Box>

      <Paper sx={{ p: 3, backgroundColor: "#1e293b", color: "white", maxWidth: 600 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>{student.firstName} {student.lastName}</Typography>
        <DetailRow label="Email" value={student.email} />
        <DetailRow label="Phone" value={student.phone} />
        <DetailRow label="Date of Birth" value={student.dateOfBirth} />
        <DetailRow label="Course" value={student.course} />
        <DetailRow label="Batch" value={student.batch} />

        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" sx={{ color: "#94a3b8", mb: 0.5 }}>
            Progress ({student.score}%)
          </Typography>
          <LinearProgress variant="determinate" value={student.score} sx={{ height: 8, borderRadius: 4 }} />
        </Box>

        <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
          <Button variant="contained" onClick={() => router.push(`/students/${student.id}/edit`)}>Edit Student</Button>
          <Button variant="outlined" onClick={() => router.push("/students")}>Back</Button>
        </Box>
      </Paper>
    </AppLayout>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <Typography sx={{ color: "#cbd5e1", mb: 0.5 }}>
      <strong style={{ color: "white" }}>{label}:</strong> {value}
    </Typography>
  );
}