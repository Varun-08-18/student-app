"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Typography,
  Paper,
  Avatar,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CampaignIcon from "@mui/icons-material/Campaign";

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
  const { students, loading, error } = useStudents();

  const stats = useMemo(() => computeStudentStats(students), [students]);

  return (
    <AppLayout>
      <Box
        sx={{
          minHeight: "100%",
          background: "linear-gradient(135deg, #f0fdfa 0%, #f8fafc 100%)",
          p: { xs: 2, md: 3 },
          borderRadius: 3,
        }}
      >
        {/* ========== HEADER ========== */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              sx={{
                width: 56,
                height: 56,
                bgcolor: "#167c6a",
                fontWeight: 700,
              }}
            >
              A
            </Avatar>
            <Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: "#0f172a" }}
              >
                Admin Dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Overview of all students and performance
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
            <Button
              variant="outlined"
              startIcon={<VisibilityIcon />}
              onClick={() => router.push("/students")}
              sx={{
                borderRadius: 3,
                textTransform: "none",
                borderColor: "#167c6a",
                color: "#167c6a",
                fontWeight: 600,
              }}
            >
              View All Students
            </Button>
            <Button
              variant="contained"
              startIcon={<PersonAddIcon />}
              onClick={() => router.push("/students/add")}
              sx={{
                backgroundColor: "#167c6a",
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 600,
                px: 3,
                boxShadow: "0 8px 20px rgba(22,124,106,0.25)",
                "&:hover": { backgroundColor: "#126b5a" },
              }}
            >
              Add Student
            </Button>
            <Button
              variant="contained"
              startIcon={<CampaignIcon />}
              onClick={() => router.push("/announcements")}
              sx={{
                backgroundColor: "#0f766e",
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 600,
                "&:hover": { backgroundColor: "#0d9488" },
              }}
            >
              Announcements
            </Button>
          </Box>
        </Box>

        {/* ========== STATS CARDS ========== */}
        {loading ? (
          <Loading label="Loading dashboard..." />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                  md: "repeat(3, 1fr)",
                  lg: "repeat(5, 1fr)",
                },
                gap: 2.5,
                mb: 4,
              }}
            >
              <StatCard
                title="Total Students"
                value={stats.total}
                icon={<PeopleIcon />}
                color="#167c6a"
              />
              <StatCard
                title="Active"
                value={stats.active}
                icon={<CheckCircleIcon />}
                color="#059669"
              />
              <StatCard
                title="Completed"
                value={stats.completed}
                icon={<TrendingUpIcon />}
                color="#2563eb"
              />
              <StatCard
                title="Average Score"
                value={`${stats.avgScore}%`}
                icon={<TrendingUpIcon />}
                color="#7c3aed"
              />
              <StatCard
                title="Pending Tasks"
                value={stats.pendingAssignments}
                icon={<AssignmentIcon />}
                color="#d97706"
              />
            </Box>

            {/* ========== STUDENTS TABLE SECTION ========== */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 4,
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Recent Students
                </Typography>
                <Button
                  size="small"
                  onClick={() => router.push("/students")}
                  sx={{ textTransform: "none", color: "#167c6a" }}
                >
                  View all →
                </Button>
              </Box>

              <StudentTable
                students={students.slice(0, 5)} // show only latest 5 for cleaner look
                onView={(id) => router.push(`/students/${id}`)}
                onEdit={(id) => router.push(`/students/${id}/edit`)}
                onDelete={(id) => {
                  console.log("Delete student:", id);
                }}
              />
            </Paper>
          </>
        )}
      </Box>
    </AppLayout>
  );
}