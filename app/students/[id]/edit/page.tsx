"use client";

import { useParams } from "next/navigation";

export default function EditStudentPage() {
  const params = useParams();
  const id = params.id;

  return (
    <div style={{ padding: 40, color: "white" }}>
      Edit Student Page — ID: {id}
    </div>
  );
}