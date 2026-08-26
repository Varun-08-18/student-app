import { Box, CircularProgress, Typography } from "@mui/material";

export default function Loading({ label = "Loading..." }: { label?: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        py: 8,
        color: "#94a3b8",
      }}
    >
      <CircularProgress size={32} />
      <Typography>{label}</Typography>
    </Box>
  );
}