import { Box, Typography, Paper } from "@mui/material";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  color?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  color = "#167c6a",
}: StatCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        backgroundColor: "white",
        border: "1px solid #e2e8f0",
        boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
        transition: "all 0.25s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 28px rgba(22,124,106,0.12)",
          borderColor: "#cce5df",
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 1, fontWeight: 500 }}
          >
            {title}
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, color: "#0f172a", lineHeight: 1 }}
          >
            {value}
          </Typography>
        </Box>

        {icon && (
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 3,
              backgroundColor: `${color}15`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: color,
            }}
          >
            {icon}
          </Box>
        )}
      </Box>
    </Paper>
  );
}