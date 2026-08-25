"use client";

import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#0f172a" }}>
      <Sidebar />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header />
        <Box sx={{ flex: 1, padding: 3, color: "white" }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}