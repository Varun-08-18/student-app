import { Box, IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface StudentTableActionsProps {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function StudentTableActions({
  onView,
  onEdit,
  onDelete,
}: StudentTableActionsProps) {
  return (
    <Box sx={{ display: "flex", gap: 0.5 }}>
      <Tooltip title="View">
        <IconButton size="small" onClick={onView} sx={{ color: "#249b86" }}>
          <VisibilityIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit">
        <IconButton size="small" onClick={onEdit} sx={{ color: "#fcd34d" }}>
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton size="small" onClick={onDelete} sx={{ color: "#f87171" }}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}