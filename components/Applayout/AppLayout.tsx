"use client";

import { Box } from "@mui/material";
import Sidebar from "../Sidebar";
import Header from "../Header/Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f4f8f6" }}>
      <Sidebar />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header />
      <Box sx={{ flex: 1, padding: 3, color: "#1f2933" }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}