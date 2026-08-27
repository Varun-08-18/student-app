"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "student">("admin");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // --- ADMIN LOGIN ---
    if (role === "admin") {
      if (email === "admin@test.com" && password === "123456") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "admin");
        localStorage.setItem("userEmail", email);
        localStorage.removeItem("studentId"); // clear any previous student session
        router.push("/dashboard");
        return;
      }
      alert("Invalid admin credentials");
      return;
    }

    // --- STUDENT LOGIN ---
    // Match against students stored in localStorage
    const STORAGE_KEY = "student-management-students";
    const raw = localStorage.getItem(STORAGE_KEY);
    const students = raw ? JSON.parse(raw) : [];

    const matchedStudent = students.find(
      (s: any) => s.email.toLowerCase() === email.toLowerCase()
    );

    // Simple password rule for demo: password = "123456" for any student
    // (You can later make a real password field on students)
    if (matchedStudent && password === "123456") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", "student");
      localStorage.setItem("userEmail", email);
      localStorage.setItem("studentId", String(matchedStudent.id));
      router.push("/student-dashboard"); // dedicated student page
      return;
    }

    alert("Invalid student email or password");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f4f8f6",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: 400, borderRadius: 3 }}>
        <Typography
          variant="h5"
          sx={{ color: "#183b36", textAlign: "center", mb: 3, fontWeight: 600 }}
        >
          Student App Login
        </Typography>

        <form onSubmit={handleLogin}>
          {/* Role Radio Buttons */}
          <FormControl component="fieldset" sx={{ mb: 3, width: "100%" }}>
            <FormLabel component="legend" sx={{ mb: 1, color: "#183b36" }}>
              Login as
            </FormLabel>
            <RadioGroup
              row
              value={role}
              onChange={(e) => setRole(e.target.value as "admin" | "student")}
            >
              <FormControlLabel value="admin" control={<Radio />} label="Admin" />
              <FormControlLabel value="student" control={<Radio />} label="Student" />
            </RadioGroup>
          </FormControl>

          <TextField
            fullWidth
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#167c6a",
              py: 1.4,
              "&:hover": { backgroundColor: "#126b5a" },
            }}
          >
            Login
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 3, color: "text.secondary", textAlign: "center" }}>
          <strong>Demo credentials</strong>
          <br />
          Admin → admin@test.com / 123456
          <br />
          Student → use any student email from the list / 123456
        </Typography>
      </Paper>
    </Box>
  );
}