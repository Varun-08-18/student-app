"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Typography } from "@mui/material";

import AppLayout from "@/components/Applayout/AppLayout";
import Loading from "@/components/Loading/Loading";
import StatCard from "@/components/StatCard";
import StudentTable from "@/components/StudentTable/StudentTable";

import { useStudents } from "@/hooks/useStudents";
import { useRequireAuth } from "@/hooks/useRequireAuth";

import { computeStudentStats } from "../library/studentStats";

export default function Dashboard() {
  useRequireAuth(["admin"]);

  const router = useRouter();

  const {
    students,
    loading,
    error,
  } = useStudents();

  const stats = useMemo(
    () => computeStudentStats(students),
    [students]
  );

  return (
    <AppLayout>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Dashboard
      </Typography>

      {loading ? (
        <Loading label="Loading dashboard..." />
      ) : error ? (
        <Typography color="error">
          {error}
        </Typography>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              mb: 4,
            }}
          >
            <StatCard
              title="Total Students"
              value={stats.total}
            />

            <StatCard
              title="Active Students"
              value={stats.active}
            />

            <StatCard
              title="Completed Students"
              value={stats.completed}
            />

            <StatCard
              title="Average Score"
              value={`${stats.avgScore}%`}
            />

            <StatCard
              title="Pending Assignments"
              value={stats.pendingAssignments}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              mb: 4,
            }}
          >
            <Button
              variant="contained"
              onClick={() =>
                router.push("/students")
              }
            >
              View Students
            </Button>

            <Button
              variant="contained"
              color="success"
              onClick={() =>
                router.push("/students/add")
              }
            >
              Add Student
            </Button>
          </Box>

          <Box>
            <Typography
              variant="h6"
              sx={{ mb: 2 }}
            >
              Students
            </Typography>

            <StudentTable
              students={students}
              onView={(id) =>
                router.push(`/students/${id}`)
              }
              onEdit={(id) =>
                router.push(`/students/${id}/edit`)
              }
              onDelete={(id) => {
                console.log(
                  "Delete student:",
                  id
                );
              }}
            />
          </Box>
        </>
      )}
    </AppLayout>
  );
}