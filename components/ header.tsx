"use client";

import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>

        <Typography sx={{ flexGrow: 1 }}>
          Student Management
        </Typography>

        <Typography>
          Admin
        </Typography>

      </Toolbar>
    </AppBar>
  );
}