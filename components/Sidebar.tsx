"use client";

import { Box, Button, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [role, setRole] = useState<"admin" | "student" | null>(null);

  useEffect(() => {
    setRole(localStorage.getItem("userRole") as "admin" | "student" | null);
  }, []);

  const adminMenu = [
    { label: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    { label: "Students", path: "/students", icon: <PeopleIcon /> },
  ];

  const studentMenu = [
    { label: "My Performance", path: "/student-dashboard", icon: <PersonIcon /> },
  ];

  const menuItems = role === "student" ? studentMenu : adminMenu;

  return (
    <Box
      sx={{
        width: 220,
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        borderRight: "1px solid #dce8e3",
        padding: 2,
      }}
    >
      <Box sx={{ mb: 4, fontWeight: "bold", fontSize: 18, px: 1, color: "#183b36" }}>
        Student App
        {role && (
          <Typography variant="caption" sx={{ display: "block" }} color="text.secondary">
            ({role})
          </Typography>
        )}
      </Box>

      {menuItems.map((item) => (
        <Button
          key={item.path}
          fullWidth
          startIcon={item.icon}
          onClick={() => router.push(item.path)}
          sx={{
            justifyContent: "flex-start",
            mb: 1,
            color: pathname === item.path ? "#167c6a" : "#526b66",
            backgroundColor: pathname === item.path ? "#e8f3ef" : "transparent",
            "&:hover": { backgroundColor: "#eef6f3" },
          }}
        >
          {item.label}
        </Button>
      ))}
    </Box>
  );
}