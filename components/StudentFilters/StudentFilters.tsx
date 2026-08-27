"use client";

import { useEffect, useState } from "react";
import { Box, TextField, MenuItem, Button } from "@mui/material";

import { EMPTY_FILTERS, StudentFilterState } from "@/src/routes/library/studentFilters";

const COURSE_OPTIONS = ["Computer Science", "Mathematics", "Physics"];
const STATUS_OPTIONS = ["Active", "Inactive", "Pending"];
const SCORE_RANGES = [
  { label: "0-49" },
  { label: "50-69" },
  { label: "70-89" },
  { label: "90-100" },
];

interface StudentFiltersProps {
  onChange: (update: StudentFilterState | ((prev: StudentFilterState) => StudentFilterState)) => void;
}

const SEARCH_DEBOUNCE_MS = 300;

export default function StudentFilters({ onChange }: StudentFiltersProps) {
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState({ course: "", status: "", scoreRange: "" });

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange((prev) => ({ ...prev, search }));
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleApply = () => {
    onChange((prev) => ({ ...prev, ...draft }));
  };

  const handleReset = () => {
    setSearch("");
    setDraft({ course: "", status: "", scoreRange: "" });
    onChange(EMPTY_FILTERS);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        alignItems: "center",
        mb: 3,
        p: 2,
        backgroundColor: "#e8f3ef",
        borderRadius: 2,
      }}
    >
      <TextField
        size="small"
        label="Search"
        placeholder="Name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ minWidth: 220, backgroundColor: "#ffffff" }}
      />

      <TextField
        select
        size="small"
        label="Course"
        value={draft.course}
        onChange={(e) => setDraft((d) => ({ ...d, course: e.target.value }))}
        sx={{ minWidth: 160, backgroundColor: "#ffffff" }}
      >
        <MenuItem value="">All</MenuItem>
        {COURSE_OPTIONS.map((course) => (
          <MenuItem key={course} value={course}>
            {course}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        size="small"
        label="Status"
        value={draft.status}
        onChange={(e) => setDraft((d) => ({ ...d, status: e.target.value }))}
        sx={{ minWidth: 160, backgroundColor: "#ffffff" }}
      >
        <MenuItem value="">All</MenuItem>
        {STATUS_OPTIONS.map((status) => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        size="small"
        label="Score"
        value={draft.scoreRange}
        onChange={(e) => setDraft((d) => ({ ...d, scoreRange: e.target.value }))}
        sx={{ minWidth: 160, backgroundColor: "#ffffff" }}
      >
        <MenuItem value="">All</MenuItem>
        {SCORE_RANGES.map((range) => (
          <MenuItem key={range.label} value={range.label}>
            {range.label}
          </MenuItem>
        ))}
      </TextField>

      <Button variant="contained" onClick={handleApply}>
        Apply Filters
      </Button>
      <Button variant="outlined" onClick={handleReset}>
        Reset
      </Button>
    </Box>
  );
}