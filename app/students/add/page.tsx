"use client";

import { useRouter } from "next/navigation";
import { useStudents } from "../../../hooks/useStudents";
import StudentForm from "../../../components/StudentForm";

export default function AddStudentPage() {
  const router = useRouter();
  const { addStudent } = useStudents();

  const handleSubmit = async (student: any) => {
    await addStudent(student);
    router.push("/students");
  };

  return (
    <div>
      <h1>Add Student</h1>

      <StudentForm
        onSubmit={handleSubmit}
      />
    </div>
  );
}