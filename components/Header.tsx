"use client";

import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

export default function Header() {
  const router = useRouter();
  const { adminName } = useAppContext();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 24px",
        backgroundColor: "#0f172a",
        borderBottom: "1px solid #334155",
        color: "white",
      }}
    >
      <Typography variant="h6">Student Management</Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography>{adminName}</Typography>
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}