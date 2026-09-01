"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AppLayout from "@/components/Applayout/AppLayout";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import {
  announcementService,
  Announcement,
} from "@/services/announcementService";
import { toast } from "react-toastify";
import Loading from "@/components/Loading/Loading";

export default function AnnouncementsPage() {
  // Both admin and student can open this page
  useRequireAuth(["admin", "student"]);

  const [role, setRole] = useState<"admin" | "student" | null>(null);
  const [list, setList] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setRole(localStorage.getItem("userRole") as "admin" | "student" | null);
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const data = await announcementService.getAll();
    setList(data);
    setLoading(false);
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setTitle("");
    setMessage("");
    setOpen(true);
  };

  const handleOpenEdit = (item: Announcement) => {
    setEditingId(item.id);
    setTitle(item.title);
    setMessage(item.message);
    setOpen(true);
  };

  const handleSave = async () => {
    if (!title.trim() || !message.trim()) {
      toast.error("Title and message are required");
      return;
    }

    try {
      if (editingId) {
        await announcementService.update(editingId, title, message);
        toast.success("Announcement updated");
      } else {
        await announcementService.create(title, message);
        toast.success("Announcement created");
      }
      setOpen(false);
      loadData();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this announcement?")) return;
    await announcementService.delete(id);
    toast.success("Deleted");
    loadData();
  };

  return (
    <AppLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#183b36" }}>
          Announcements
        </Typography>

        {role === "admin" && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenCreate}
            sx={{
              backgroundColor: "#167c6a",
              textTransform: "none",
              borderRadius: 2,
              "&:hover": { backgroundColor: "#126b5a" },
            }}
          >
            New Announcement
          </Button>
        )}
      </Box>

      {loading ? (
        <Loading label="Loading announcements..." />
      ) : list.length === 0 ? (
        <Typography color="text.secondary">No announcements yet.</Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {list.map((item) => (
            <Paper
              key={item.id}
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid #e5e7eb",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 1,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {item.title}
                </Typography>

                {role === "admin" && (
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenEdit(item)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(item.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                )}
              </Box>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ whiteSpace: "pre-wrap", mb: 1.5 }}
              >
                {item.message}
              </Typography>

              <Typography variant="caption" color="text.disabled">
                {new Date(item.updatedAt).toLocaleString()}
              </Typography>
            </Paper>
          ))}
        </Box>
      )}

      {/* Create / Edit Dialog (Admin only) */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          {editingId ? "Edit Announcement" : "New Announcement"}
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Message"
            fullWidth
            multiline
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{ backgroundColor: "#167c6a" }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </AppLayout>
  );
}