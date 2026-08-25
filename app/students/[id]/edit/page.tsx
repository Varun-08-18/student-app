"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import StudentForm from "../../../../components/StudentForm";

import {
  getStudentById,
  updateStudent,
} from "../../../../services/studentService";

export default function EditStudentPage() {
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
    return <p>Loading...</p>;
  }

  const handleSubmit = async (data: any) => {
    await updateStudent(Number(params.id), data);

    router.push("/students");
  };

  return (
    <div>
      <h1>Edit Student</h1>

      <StudentForm
        initialValues={student}
        onSubmit={handleSubmit}
        isEdit={true}
      />
    </div>
  );
}