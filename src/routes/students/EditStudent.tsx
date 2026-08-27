"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import { toast } from "react-toastify";

import AppLayout from "@/components/Applayout/AppLayout";
import StudentForm from "@/components/StudentForm";
import Loading from "@/components/Loading/Loading";

import { useStudents } from "@/hooks/useStudents";
import { useRequireAuth } from "@/hooks/useRequireAuth";

import { studentService } from "@/services/studentService";

import {
  Student,
  StudentInput,
} from "@/types/student";

export default function EditStudent() {
  useRequireAuth();

  const router = useRouter();
  const params = useParams();

  const id = Number(params.id);

  const {
    students,
    updateStudent,
  } = useStudents();

  const [student, setStudent] =
    useState<Student | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      if (Number.isNaN(id)) {
        setStudent(null);
        setLoading(false);
        return;
      }

      try {
        const data =
          await studentService.getStudentById(
            id
          );

        setStudent(data ?? null);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const handleSubmit = async (
    values: StudentInput
  ) => {
    try {
      await updateStudent(
        id,
        values
      );

      toast.success(
        "Student updated successfully"
      );

      router.push("/students");
    } catch {
      toast.error(
        "Could not update student. Please try again."
      );
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <Loading />
      </AppLayout>
    );
  }

  if (!student) {
    return (
      <AppLayout>
        <h1>Student not found</h1>

        <button
          onClick={() =>
            router.push("/students")
          }
        >
          Back to Students
        </button>
      </AppLayout>
    );
  }

  const existingEmails =
    students
      .filter((s) => s.id !== id)
      .map((s) =>
        s.email.toLowerCase()
      );

  const initialValues: StudentInput =
    student;

  return (
    <AppLayout>
      <h1>Edit Student</h1>

      <StudentForm
        isEdit
        initialValues={initialValues}
        existingEmails={existingEmails}
        onSubmit={handleSubmit}
      />
    </AppLayout>
  );
}