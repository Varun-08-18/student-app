import { Chip } from "@mui/material";
import { Student } from "@/types/student";

const STATUS_COLORS: Record<Student["status"], { bg: string; text: string }> = {
  Active: { bg: "#064e3b", text: "#6ee7b7" },
  Completed: { bg: "#1e3a8a", text: "#93c5fd" },
  Inactive: { bg: "#7c2d12", text: "#fdba74" },
};

export default function StatusBadge({ status }: { status: Student["status"] }) {
  const colors = STATUS_COLORS[status];

  return (
    <Chip
      label={status}
      size="small"
      sx={{ backgroundColor: colors.bg, color: colors.text, fontWeight: 500 }}
    />
  );
}