import { Student } from "@/types/student";

export interface StudentStats {
  total: number;
  active: number;
  completed: number;
  avgScore: number;
  pendingAssignments: number;
}

export function computeStudentStats(students: Student[]): StudentStats {
  const total = students.length;
  const active = students.filter((s) => s.status === "Active").length;
  const completed = students.filter((s) => s.status === "Completed").length;

  const avgScore =
    total === 0
      ? 0
      : Math.round(students.reduce((sum, s) => sum + s.score, 0) / total);

  const pendingAssignments = students.reduce(
    (sum, s) => sum + (s.pendingAssignments || 0),
    0
  );

  return { total, active, completed, avgScore, pendingAssignments };
}