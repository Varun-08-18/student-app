"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/AppLayout";

export default function DashboardPage() {
  const router = useRouter();
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      router.push("/login");
      return;
    }

    let data = localStorage.getItem("students");

    if (!data) {
      const sample = [
        { id: 1, name: "Aman Singh", email: "aman@test.com", course: "React", status: "Active", score: 85 },
        { id: 2, name: "Riya Sharma", email: "riya@test.com", course: "Next.js", status: "Completed", score: 92 },
        { id: 3, name: "Rahul Verma", email: "rahul@test.com", course: "TypeScript", status: "Active", score: 78 },
        { id: 4, name: "Priya Patel", email: "priya@test.com", course: "React", status: "Inactive", score: 65 },
      ];
      localStorage.setItem("students", JSON.stringify(sample));
      data = JSON.stringify(sample);
    }

    setStudents(JSON.parse(data));
  }, [router]);

  const total = students.length;
  const active = students.filter((s) => s.status === "Active").length;
  const completed = students.filter((s) => s.status === "Completed").length;
  const avgScore =
    total > 0
      ? Math.round(students.reduce((sum, s) => sum + (s.score || 0), 0) / total)
      : 0;

  return (
    <AppLayout>
      <h1 style={{ marginBottom: 30 }}>Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
          marginBottom: 40,
        }}
      >
        <div style={{ background: "#1e293b", padding: 24, borderRadius: 12 }}>
          <p style={{ color: "#94a3b8", margin: 0 }}>Total Students</p>
          <h2>{total}</h2>
        </div>

        <div style={{ background: "#1e293b", padding: 24, borderRadius: 12 }}>
          <p style={{ color: "#94a3b8", margin: 0 }}>Active</p>
          <h2>{active}</h2>
        </div>

        <div style={{ background: "#1e293b", padding: 24, borderRadius: 12 }}>
          <p style={{ color: "#94a3b8", margin: 0 }}>Completed</p>
          <h2>{completed}</h2>
        </div>

        <div style={{ background: "#1e293b", padding: 24, borderRadius: 12 }}>
          <p style={{ color: "#94a3b8", margin: 0 }}>Avg Score</p>
          <h2>{avgScore}%</h2>
        </div>
      </div>

      <button
        onClick={() => router.push("/students")}
        style={{
          padding: "12px 24px",
          background: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: 6,
          marginRight: 12,
          cursor: "pointer",
        }}
      >
        View Students
      </button>

      <button
        onClick={() => router.push("/students/add")}
        style={{
          padding: "12px 24px",
          background: "#10b981",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Add Student
      </button>
    </AppLayout>
  );
}