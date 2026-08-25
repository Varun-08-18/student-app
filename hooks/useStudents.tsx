"use client";

import { useState, useEffect, useCallback } from "react";
import { Student, StudentInput } from "@/types/student";
import { studentService } from "@/services/studentService";

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await studentService.getStudents();
      setStudents(data);
    } catch {
      setError("Unable to load students.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const addStudent = async (data: StudentInput) => {
    const newStudent = await studentService.createStudent(data);
    setStudents((prev) => [...prev, newStudent]);
    return newStudent;
  };

  const updateStudent = async (id: number, data: StudentInput) => {
    const updated = await studentService.updateStudent(id, data);
    setStudents((prev) => prev.map((s) => (s.id === id ? updated : s)));
    return updated;
  };

  const deleteStudent = async (id: number) => {
    await studentService.deleteStudent(id);
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  return {
    students,
    loading,
    error,
    refetch: fetchStudents,
    addStudent,
    updateStudent,
    deleteStudent,
  };
}