"use client";

import { useParams } from "next/navigation";

export default function StudentDetailsPage() {
  const params = useParams();
  const id = params.id;

  return (
    <div style={{ padding: 40, color: "white" }}>
      Student Details — ID: {id}
    </div>
  );
}