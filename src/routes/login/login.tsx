"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Paper,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SchoolIcon from "@mui/icons-material/School";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "student">("admin");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // ADMIN LOGIN
    if (role === "admin") {
      if (email === "admin@test.com" && password === "123456") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "admin");
        localStorage.setItem("userEmail", email);
        localStorage.removeItem("studentId");
        router.push("/dashboard");
        return;
      }
      alert("Invalid admin credentials");
      return;
    }

    // STUDENT LOGIN
    const STORAGE_KEY = "student-management-students";
    const raw = localStorage.getItem(STORAGE_KEY);
    const students = raw ? JSON.parse(raw) : [];

    const matchedStudent = students.find(
      (s: any) => s.email.toLowerCase() === email.toLowerCase()
    );

    if (matchedStudent && password === "123456") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", "student");
      localStorage.setItem("userEmail", email);
      localStorage.setItem("studentId", String(matchedStudent.id));
      router.push("/student-dashboard");
      return;
    }

    alert("Invalid student email or password");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        backgroundColor: "#0f172a",
      }}
    >
      {/* ========== LEFT SIDE - LOGIN FORM ========== */}
      <Box
        sx={{
          flex: { xs: 1, md: "0 0 45%" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 3, md: 6 },
          backgroundColor: "#0f172a",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 400 }}>
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 5 }}>
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: 2,
                backgroundColor: "#167c6a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SchoolIcon sx={{ color: "white", fontSize: 24 }} />
            </Box>
            <Typography
              variant="h6"
              sx={{ color: "white", fontWeight: 700, letterSpacing: 0.3 }}
            >
              Student Portal
            </Typography>
          </Box>

          <Typography
            variant="h4"
            sx={{ color: "white", fontWeight: 700, mb: 1 }}
          >
            Login
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "rgba(255,255,255,0.6)", mb: 4 }}
          >
            Enter your account details
          </Typography>

          <form onSubmit={handleLogin}>
            {/* Role Radio */}
            <FormControl component="fieldset" sx={{ mb: 3, width: "100%" }}>
              <RadioGroup
                row
                value={role}
                onChange={(e) => setRole(e.target.value as "admin" | "student")}
              >
                <FormControlLabel
                  value="admin"
                  control={
                    <Radio
                      sx={{
                        color: "rgba(255,255,255,0.4)",
                        "&.Mui-checked": { color: "#167c6a" },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ color: "rgba(255,255,255,0.85)" }}>
                      Admin
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="student"
                  control={
                    <Radio
                      sx={{
                        color: "rgba(255,255,255,0.4)",
                        "&.Mui-checked": { color: "#167c6a" },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ color: "rgba(255,255,255,0.85)" }}>
                      Student
                    </Typography>
                  }
                />
              </RadioGroup>
            </FormControl>

            {/* Email */}
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              variant="standard"
              sx={{
                mb: 3,
                input: { color: "white" },
                label: { color: "rgba(255,255,255,0.5)" },
                "& .MuiInput-underline:before": {
                  borderBottomColor: "rgba(255,255,255,0.2)",
                },
                "& .MuiInput-underline:hover:before": {
                  borderBottomColor: "rgba(255,255,255,0.4)",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#167c6a",
                },
              }}
            />

            {/* Password - Fixed version */}
            <Box sx={{ position: "relative", mb: 4 }}>
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                variant="standard"
                sx={{
                  input: { color: "white", pr: 5 },
                  label: { color: "rgba(255,255,255,0.5)" },
                  "& .MuiInput-underline:before": {
                    borderBottomColor: "rgba(255,255,255,0.2)",
                  },
                  "& .MuiInput-underline:hover:before": {
                    borderBottomColor: "rgba(255,255,255,0.4)",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "#167c6a",
                  },
                }}
              />
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                sx={{
                  position: "absolute",
                  right: 0,
                  bottom: 4,
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                py: 1.5,
                borderRadius: 2,
                backgroundColor: "#167c6a",
                fontWeight: 600,
                fontSize: "1rem",
                textTransform: "none",
                boxShadow: "0 8px 24px rgba(22,124,106,0.35)",
                "&:hover": {
                  backgroundColor: "#126b5a",
                },
              }}
            >
              Login
            </Button>
          </form>

        </Box>
      </Box>

      {/* ========== RIGHT SIDE - ILLUSTRATION PANEL ========== */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(145deg, #167c6a 0%, #0f766e 50%, #134e4a 100%)",
          position: "relative",
          overflow: "hidden",
          p: 6,
        }}
      >
        {/* Decorative circles */}
        <Box
          sx={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.06)",
            top: -100,
            right: -100,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            width: 300,
            height: 300,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.05)",
            bottom: -80,
            left: -60,
          }}
        />

        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            maxWidth: 420,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: "white",
              fontWeight: 800,
              mb: 2,
              lineHeight: 1.2,
            }}
          >
            Welcome to
            <br />
            Student Portal
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "rgba(255,255,255,0.85)", mb: 4 }}
          >
            Login to access your account and manage your academic journey
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 3,
              mt: 4,
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: 4,
                backgroundColor: "rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SchoolIcon sx={{ fontSize: 40, color: "white" }} />
            </Box>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: 4,
                backgroundColor: "rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{ fontSize: 32, color: "white", fontWeight: 700 }}
              >
                A+
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}