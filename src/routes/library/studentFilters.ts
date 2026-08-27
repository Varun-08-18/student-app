import { Student } from "@/types/student";

import { SCORE_RANGES } from "./constants";

export interface StudentFilterState {
  search: string;
  course: string;
  status: string;
  scoreRange: string;
}

export const EMPTY_FILTERS: StudentFilterState = {
  search: "",
  course: "",
  status: "",
  scoreRange: "",
};

export function filterStudents(
  students: Student[],
  filters: StudentFilterState
): Student[] {
  const search =
    filters.search.trim().toLowerCase();

  const range = SCORE_RANGES.find(
    (r) => r.label === filters.scoreRange
  );

  return students.filter((student) => {
    const fullName =
      `${student.firstName} ${student.lastName}`
        .toLowerCase();

    const matchesSearch =
      !search ||
      fullName.includes(search) ||
      student.email
        .toLowerCase()
        .includes(search);

    const matchesCourse =
      !filters.course ||
      student.course === filters.course;

    const matchesStatus =
      !filters.status ||
      student.status === filters.status;

    const matchesScore =
      !range ||
      (student.score >= range.min &&
        student.score <= range.max);

    return (
      matchesSearch &&
      matchesCourse &&
      matchesStatus &&
      matchesScore
    );
  });
}