import { Chip } from "@mui/material";
import { Student } from "@/types/student";

const STATUS_COLORS: Record<Student["status"], { bg: string; text: string }> = {
  Active: { bg: "#d8f2e8", text: "#12634f" },
  Completed: { bg: "#e4edf8", text: "#315d88" },
  Inactive: { bg: "#fbe8dc", text: "#9a4d25" },
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