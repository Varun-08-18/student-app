"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Student } from "@/types/student";
import { studentService } from "@/services/studentService";

export default function StudentDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const id = Number(params.id);

        if (Number.isNaN(id)) {
          setStudent(null);
          return;
        }

        const data = await studentService.getStudentById(id);

        setStudent(data ?? null);
      } catch (error) {
        console.error(error);
        setStudent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!student) {
    return (
      <div>
        <h1>Student not found</h1>

        <button onClick={() => router.push("/students")}>
          Back to Students
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Student Details</h1>

      <p>
        <strong>ID:</strong> {student.id}
      </p>

      <p>
        <strong>Name:</strong> {student.name}
      </p>

      <p>
        <strong>Email:</strong> {student.email}
      </p>

      <button onClick={() => router.push("/students")}>
        Back
      </button>

      <button
        onClick={() =>
          router.push(`/students/${student.id}/edit`)
        }
      >
        Edit
      </button>
    </div>
  );
}