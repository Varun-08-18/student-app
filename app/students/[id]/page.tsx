"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { getStudentById } from "../../../services/studentService";

export default function StudentDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    const loadStudent = async () => {
      const data = await getStudentById(Number(params.id));
      setStudent(data);
    };

    loadStudent();
  }, [params.id]);

  if (!student) {
    return <p>Student not found</p>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Student Details</h1>

      <p>
        <b>Name:</b> {student.firstName} {student.lastName}
      </p>

      <p>
        <b>Email:</b> {student.email}
      </p>

      <p>
        <b>Phone:</b> {student.phone}
      </p>

      <p>
        <b>Date of Birth:</b> {student.dateOfBirth}
      </p>

      <p>
        <b>Course:</b> {student.course}
      </p>

      <p>
        <b>Batch:</b> {student.batch}
      </p>

      <p>
        <b>Start Date:</b> {student.startDate}
      </p>

      <p>
        <b>Trainer:</b> {student.trainer}
      </p>

      <p>
        <b>Experience:</b> {student.experience}
      </p>

      <p>
        <b>Status:</b> {student.status}
      </p>

      <p>
        <b>Score:</b> {student.score}
      </p>

      <p>
        <b>Pending Assignments:</b> {student.pendingAssignments}
      </p>

      <p>
        <b>Progress:</b> {student.score}%
      </p>

      <button
        onClick={() =>
          router.push(`/students/${student.id}/edit`)
        }
      >
        Edit Student
      </button>

      <button
        onClick={() => router.push("/students")}
        style={{ marginLeft: "10px" }}
      >
        Back
      </button>
    </div>
  );
}