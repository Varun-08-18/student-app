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
} from "@mui/material";
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

  // Form state
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
      [name]: name === "score" || name === "pendingAssignments" ? Number(value) : value,
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
    } catch (error) {
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

  return (
    <AppLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          My Performance
        </Typography>

        {!isEditing ? (
          <Button
            variant="contained"
            sx={{ backgroundColor: "#167c6a" }}
            onClick={() => setIsEditing(true)}
          >
            Edit My Information
          </Button>
        ) : (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="outlined" onClick={handleCancel} disabled={saving}>
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#167c6a" }}
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </Box>
        )}
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {/* ========== PERSONAL DETAILS ========== */}
        <Paper sx={{ p: 3, flex: "1 1 320px", minWidth: 280 }}>
          <Typography variant="h6" gutterBottom>
            Personal Details
          </Typography>

          {isEditing ? (
            <>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName || ""}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName || ""}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth || ""}
                onChange={handleChange}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </>
          ) : (
            <>
              <Typography sx={{ mb: 1 }}>
                <strong>Name:</strong> {student.firstName} {student.lastName}
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <strong>Email:</strong> {student.email}
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <strong>Phone:</strong> {student.phone}
              </Typography>
              <Typography>
                <strong>Date of Birth:</strong> {student.dateOfBirth}
              </Typography>
            </>
          )}
        </Paper>

        {/* ========== COURSE INFO ========== */}
        <Paper sx={{ p: 3, flex: "1 1 320px", minWidth: 280 }}>
          <Typography variant="h6" gutterBottom>
            Course Info
          </Typography>

          {isEditing ? (
            <>
              <TextField
                fullWidth
                label="Course"
                name="course"
                value={formData.course || ""}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Batch"
                name="batch"
                value={formData.batch || ""}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Trainer"
                name="trainer"
                value={formData.trainer || ""}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Start Date"
                name="startDate"
                type="date"
                value={formData.startDate || ""}
                onChange={handleChange}
                slotProps={{ inputLabel: { shrink: true } }}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
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
            </>
          ) : (
            <>
              <Typography sx={{ mb: 1 }}>
                <strong>Course:</strong> {student.course}
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <strong>Batch:</strong> {student.batch}
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <strong>Trainer:</strong> {student.trainer}
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <strong>Start Date:</strong> {student.startDate}
              </Typography>
              <Typography>
                <strong>Status:</strong>{" "}
                <Chip
                  label={student.status}
                  color={
                    student.status === "Active"
                      ? "success"
                      : student.status === "Completed"
                      ? "primary"
                      : "default"
                  }
                  size="small"
                />
              </Typography>
            </>
          )}
        </Paper>

        {/* ========== PERFORMANCE ========== */}
        <Paper sx={{ p: 3, flex: "1 1 320px", minWidth: 280 }}>
          <Typography variant="h6" gutterBottom>
            Performance
          </Typography>

          {isEditing ? (
            <>
              <TextField
                fullWidth
                label="Score (%)"
                name="score"
                type="number"
                value={formData.score ?? ""}
                onChange={handleChange}
                sx={{ mb: 2 }}
                slotProps={{ htmlInput: { min: 0, max: 100 } }}
              />
              <TextField
                fullWidth
                label="Pending Assignments"
                name="pendingAssignments"
                type="number"
                value={formData.pendingAssignments ?? ""}
                onChange={handleChange}
                slotProps={{ htmlInput: { min: 0, max: 100 } }}
              />
            </>
          ) : (
            <>
              <Typography
                variant="h3"
                color="primary"
                sx={{ fontWeight: 700 }}
              >
                {student.score}%
              </Typography>
              <Typography sx={{ mt: 1.5 }}>
                Pending Assignments:{" "}
                <strong>{student.pendingAssignments}</strong>
              </Typography>
            </>
          )}
        </Paper>
      </Box>
    </AppLayout>
  );
}