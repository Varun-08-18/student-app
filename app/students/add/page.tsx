"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import AppLayout from "@/components/Applayout/AppLayout";
import StudentForm from "@/components/StudentForm";
import Loading from "@/components/Loading/Loading";
import { useStudents } from "@/hooks/useStudents";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { StudentInput } from "@/types/student";

export default function AddStudentPage() {
  useRequireAuth();
  const router = useRouter();
  const { students, loading, addStudent } = useStudents();

  const handleSubmit = async (values: StudentInput) => {
    try {
      await addStudent(values);
      toast.success("Student added successfully");
      router.push("/students");
    } catch {
      toast.error("Could not add student. Please try again.");
    }
  };

  const existingEmails = students.map((s) => s.email.toLowerCase());

  return (
    <AppLayout>
      <h1>Add Student</h1>
      {loading ? <Loading /> : <StudentForm existingEmails={existingEmails} onSubmit={handleSubmit} />}
    </AppLayout>
  );
}