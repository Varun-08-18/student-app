"use client";

import { Box, Button } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { label: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    { label: "Students", path: "/students", icon: <PeopleIcon /> },
  ];

  return (
    <Box
      sx={{
        width: 220,
        minHeight: "100vh",
        backgroundColor: "#1e293b",
        borderRight: "1px solid #334155",
        padding: 2,
        color: "white",
      }}
    >
      <Box sx={{ mb: 4, fontWeight: "bold", fontSize: 18, px: 1 }}>
        Student App
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
            color: pathname === item.path ? "#60a5fa" : "#e2e8f0",
            backgroundColor: pathname === item.path ? "#334155" : "transparent",
            "&:hover": {
              backgroundColor: "#334155",
            },
          }}
        >
          {item.label}
        </Button>
      ))}
    </Box>
  );
}