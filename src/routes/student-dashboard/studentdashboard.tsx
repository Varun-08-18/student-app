"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Chip,
  Button,
  TextField,
  Avatar,
  LinearProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AppLayout from "@/components/Applayout/AppLayout";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { studentService } from "@/services/studentService";
import { Student, StudentInput } from "@/types/student";
import Loading from "@/components/Loading/Loading";
import { toast } from "react-toastify";

export default function StudentDashboard() {
  useRequireAuth(["student"]);

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const id = localStorage.getItem("studentId");
    if (!id) return;

    studentService.getStudentById(Number(id)).then((data) => {
      if (data) {
        setStudent(data);
        setFormData({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
        });
      }
      setLoading(false);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!student) return;

    try {
      setSaving(true);
      const updatedData: StudentInput = {
        ...student,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
      };
      const updated = await studentService.updateStudent(student.id, updatedData);
      setStudent(updated);
      setIsEditing(false);
      toast.success("Information updated successfully!");
    } catch {
      toast.error("Failed to update");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (student) {
      setFormData({
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        phone: student.phone,
      });
    }
    setIsEditing(false);
  };

  if (loading) {
    return (
      <AppLayout>
        <Loading label="Loading your profile..." />
      </AppLayout>
    );
  }

  if (!student) {
    return (
      <AppLayout>
        <Typography color="error">Student profile not found.</Typography>
      </AppLayout>
    );
  }

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
        {/* ========== TOP GREETING ========== */}
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
                width: 64,
                height: 64,
                bgcolor: "#167c6a",
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              {student.firstName?.[0]}
              {student.lastName?.[0]}
            </Avatar>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, color: "#0f172a" }}>
                Hello, {student.firstName}!
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Here's your performance overview
              </Typography>
            </Box>
          </Box>

          {!isEditing ? (
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() => setIsEditing(true)}
              sx={{
                backgroundColor: "#167c6a",
                borderRadius: 3,
                textTransform: "none",
                px: 3,
                py: 1.2,
                fontWeight: 600,
                boxShadow: "0 8px 20px rgba(22,124,106,0.25)",
                "&:hover": { backgroundColor: "#126b5a" },
              }}
            >
              Edit Profile
            </Button>
          ) : (
            <Box sx={{ display: "flex", gap: 1.5 }}>
              <Button
                variant="outlined"
                startIcon={<CloseIcon />}
                onClick={handleCancel}
                disabled={saving}
                sx={{ borderRadius: 3, textTransform: "none" }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                disabled={saving}
                sx={{
                  backgroundColor: "#167c6a",
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                {saving ? "Saving..." : "Save"}
              </Button>
            </Box>
          )}
        </Box>

        {/* ========== MAIN GRID ========== */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1.2fr 1fr" },
            gap: 3,
          }}
        >
          {/* LEFT COLUMN */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Personal Info Card */}
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
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                <PersonIcon sx={{ color: "#167c6a" }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Personal Information
                </Typography>
              </Box>

              {isEditing ? (
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                  <TextField
                    size="small"
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    fullWidth
                  />
                  <TextField
                    size="small"
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    fullWidth
                  />
                  <TextField
                    size="small"
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    sx={{ gridColumn: "1 / -1" }}
                  />
                  <TextField
                    size="small"
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    fullWidth
                    sx={{ gridColumn: "1 / -1" }}
                  />
                </Box>
              ) : (
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2.5 }}>
                  <InfoItem label="Full Name" value={`${student.firstName} ${student.lastName}`} />
                  <InfoItem label="Email" value={student.email} />
                  <InfoItem label="Phone" value={student.phone} />
                  <InfoItem label="Date of Birth" value={student.dateOfBirth} />
                </Box>
              )}
            </Paper>

            {/* Course Card */}
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
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                <SchoolIcon sx={{ color: "#167c6a" }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Course Details
                </Typography>
              </Box>

              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2.5 }}>
                <InfoItem label="Course" value={student.course} />
                <InfoItem label="Batch" value={student.batch} />
                <InfoItem label="Trainer" value={student.trainer} />
                <InfoItem label="Start Date" value={student.startDate} />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Status
                  </Typography>
                  <Box sx={{ mt: 0.5 }}>
                    <Chip
                      label={student.status}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        ...(student.status === "Active" && {
                          bgcolor: "#d1fae5",
                          color: "#065f46",
                        }),
                        ...(student.status === "Completed" && {
                          bgcolor: "#dbeafe",
                          color: "#1e40af",
                        }),
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>

          {/* RIGHT COLUMN - Score Card */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              background: "linear-gradient(145deg, #167c6a 0%, #0f766e 100%)",
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: 380,
              boxShadow: "0 20px 40px rgba(22,124,106,0.25)",
            }}
          >
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                <AssignmentIcon />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Performance
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.85 }}>
                Your current progress
              </Typography>
            </Box>

            <Box sx={{ textAlign: "center", my: 3 }}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "4rem", md: "5rem" },
                  lineHeight: 1,
                }}
              >
                {student.score}
                <Typography component="span" sx={{ fontSize: "2rem", opacity: 0.8 }}>
                  %
                </Typography>
              </Typography>
              <Typography sx={{ mt: 1, opacity: 0.9 }}>Overall Score</Typography>
            </Box>

            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2">Pending Assignments</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {student.pendingAssignments}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={Math.min(100, student.score)}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "rgba(255,255,255,0.2)",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "white",
                    borderRadius: 5,
                  },
                }}
              />
            </Box>
          </Paper>
        </Box>
      </Box>
    </AppLayout>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
        {label}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 600, color: "#0f172a", mt: 0.3 }}>
        {value || "—"}
      </Typography>
    </Box>
  );
}