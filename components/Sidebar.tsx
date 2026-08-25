"use client";

import {
  Box,
  Button
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";

import { useRouter } from "next/navigation";

export default function Sidebar() {

  const router = useRouter();

  return (
    <Box
      sx={{
        width: 220,
        minHeight: "100vh",
        borderRight: "1px solid #ddd",
        padding: 2
      }}
    >

      <Button
        fullWidth
        startIcon={<DashboardIcon />}
        onClick={() => router.push("/dashboard")}
        sx={{ justifyContent: "flex-start", mb: 1 }}
      >
        Dashboard
      </Button>

      <Button
        fullWidth
        startIcon={<PeopleIcon />}
        onClick={() => router.push("/students")}
        sx={{ justifyContent: "flex-start" }}
      >
        Students
      </Button>

    </Box>
  );
}