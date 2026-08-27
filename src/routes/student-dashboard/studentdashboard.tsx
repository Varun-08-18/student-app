"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Chip,
  Button,
  TextField,
  MenuItem,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
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
  const [formData, setFormData] = useState<Partial<StudentInput>>({});

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
          dateOfBirth: data.dateOfBirth,
          course: data.course,
          batch: data.batch,
          startDate: data.startDate,
          trainer: data.trainer,
          experience: data.experience,
          status: data.status,
          score: data.score,
          pendingAssignments: data.pendingAssignments,
        });
      }
      setLoading(false);
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "score" || name === "pendingAssignments"
          ? Number(value)
          : value,
    }));
  };

  const handleSave = async () => {
    if (!student) return;

    try {
      setSaving(true);
      const updated = await studentService.updateStudent(
        student.id,
        formData as StudentInput
      );
      setStudent(updated);
      setIsEditing(false);
      toast.success("Your information has been updated successfully!");
    } catch {
      toast.error("Failed to update. Please try again.");
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
        dateOfBirth: student.dateOfBirth,
        course: student.course,
        batch: student.batch,
        startDate: student.startDate,
        trainer: student.trainer,
        experience: student.experience,
        status: student.status,
        score: student.score,
        pendingAssignments: student.pendingAssignments,
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

  // Common card style with hover effect
  const cardStyle = {
    p: 3,
    borderRadius: 3,
    border: "1px solid #e5e7eb",
    backgroundColor: "#ffffff",
    transition: "all 0.25s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 12px 24px -8px rgba(22, 124, 106, 0.18)",
      borderColor: "#cce5df",
    },
  };

  return (
    <AppLayout>
      {/* Header */}
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
        <Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: "#183b36", letterSpacing: "-0.3px" }}
          >
            My Performance
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            View and update your personal information
          </Typography>
        </Box>

        {!isEditing ? (
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => setIsEditing(true)}
            sx={{
              backgroundColor: "#167c6a",
              px: 3,
              py: 1.3,
              borderRadius: 2.5,
              textTransform: "none",
              fontWeight: 600,
              boxShadow: "0 4px 12px rgba(22, 124, 106, 0.25)",
              "&:hover": {
                backgroundColor: "#126b5a",
                boxShadow: "0 6px 16px rgba(22, 124, 106, 0.3)",
              },
            }}
          >
            Edit My Information
          </Button>
        ) : (
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Button
              variant="outlined"
              startIcon={<CloseIcon />}
              onClick={handleCancel}
              disabled={saving}
              sx={{
                borderColor: "#d1d5db",
                color: "#374151",
                textTransform: "none",
                borderRadius: 2.5,
                px: 2.5,
              }}
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
                px: 3,
                textTransform: "none",
                borderRadius: 2.5,
                fontWeight: 600,
                boxShadow: "0 4px 12px rgba(22, 124, 106, 0.25)",
                "&:hover": {
                  backgroundColor: "#126b5a",
                },
              }}
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </Box>
        )}
      </Box>

      {/* Cards Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 1fr",
            lg: "1fr 1fr 1fr",
          },
          gap: 3,
        }}
      >
        {/* ========== PERSONAL DETAILS ========== */}
        <Paper elevation={0} sx={cardStyle}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 700, color: "#183b36", mb: 1.5 }}
          >
            Personal Details
          </Typography>
          <Divider sx={{ mb: 2.5, borderColor: "#f0f0f0" }} />

          {isEditing ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                fullWidth
                size="small"
                label="First Name"
                name="firstName"
                value={formData.firstName || ""}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                size="small"
                label="Last Name"
                name="lastName"
                value={formData.lastName || ""}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                size="small"
                label="Email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                size="small"
                label="Phone"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                size="small"
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth || ""}
                onChange={handleChange}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.8 }}>
              <InfoRow
                label="Name"
                value={`${student.firstName} ${student.lastName}`}
              />
              <InfoRow label="Email" value={student.email} />
              <InfoRow label="Phone" value={student.phone} />
              <InfoRow label="Date of Birth" value={student.dateOfBirth} />
            </Box>
          )}
        </Paper>

        {/* ========== COURSE INFO ========== */}
        <Paper elevation={0} sx={cardStyle}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 700, color: "#183b36", mb: 1.5 }}
          >
            Course Info
          </Typography>
          <Divider sx={{ mb: 2.5, borderColor: "#f0f0f0" }} />

          {isEditing ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                fullWidth
                size="small"
                label="Course"
                name="course"
                value={formData.course || ""}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                size="small"
                label="Batch"
                name="batch"
                value={formData.batch || ""}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                size="small"
                label="Trainer"
                name="trainer"
                value={formData.trainer || ""}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                size="small"
                label="Start Date"
                name="startDate"
                type="date"
                value={formData.startDate || ""}
                onChange={handleChange}
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                fullWidth
                size="small"
                select
                label="Status"
                name="status"
                value={formData.status || "Active"}
                onChange={handleChange}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </TextField>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.8 }}>
              <InfoRow label="Course" value={student.course} />
              <InfoRow label="Batch" value={student.batch} />
              <InfoRow label="Trainer" value={student.trainer} />
              <InfoRow label="Start Date" value={student.startDate} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Status
                </Typography>
                <Chip
                  label={student.status}
                  size="small"
                  sx={{
                    fontWeight: 600,
                    ...(student.status === "Active" && {
                      backgroundColor: "#d1fae5",
                      color: "#065f46",
                    }),
                    ...(student.status === "Completed" && {
                      backgroundColor: "#dbeafe",
                      color: "#1e40af",
                    }),
                  }}
                />
              </Box>
            </Box>
          )}
        </Paper>

        {/* ========== PERFORMANCE ========== */}
        <Paper elevation={0} sx={cardStyle}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 700, color: "#183b36", mb: 1.5 }}
          >
            Performance
          </Typography>
          <Divider sx={{ mb: 2.5, borderColor: "#f0f0f0" }} />

          {isEditing ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                fullWidth
                size="small"
                label="Score (%)"
                name="score"
                type="number"
                value={formData.score ?? ""}
                onChange={handleChange}
                slotProps={{ htmlInput: { min: 0, max: 100 } }}
              />
              <TextField
                fullWidth
                size="small"
                label="Pending Assignments"
                name="pendingAssignments"
                type="number"
                value={formData.pendingAssignments ?? ""}
                onChange={handleChange}
                slotProps={{ htmlInput: { min: 0 } }}
              />
            </Box>
          ) : (
            <Box>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  color: "#167c6a",
                  lineHeight: 1,
                  mb: 0.5,
                }}
              >
                {student.score}%
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Overall Score
              </Typography>

              <Box
                sx={{
                  backgroundColor: "#f0fdfa",
                  borderRadius: 2,
                  p: 2,
                  border: "1px solid #ccfbf1",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Pending Assignments
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, color: "#0f766e", mt: 0.5 }}
                >
                  {student.pendingAssignments}
                </Typography>
              </Box>
            </Box>
          )}
        </Paper>
      </Box>
    </AppLayout>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography
        variant="body2"
        sx={{ fontWeight: 600, color: "#1f2937", textAlign: "right" }}
      >
        {value}
      </Typography>
    </Box>
  );
}