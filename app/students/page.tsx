"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function StudentsPage() {
  const router = useRouter();
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    // Protect route
    if (localStorage.getItem("isLoggedIn") !== "true") {
      router.push("/login");
      return;
    }

    // Load students
    const data = localStorage.getItem("students");
    if (data) {
      setStudents(JSON.parse(data));
    }
  }, []);

  return (
    <div style={{ padding: 40, background: "#0f172a", minHeight: "100vh", color: "white" }}>
      
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
        <h1>Students List</h1>
        <button
          onClick={() => router.push("/dashboard")}
          style={{
            padding: "8px 16px",
            background: "#64748b",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Table */}
      <table style={{ width: "100%", borderCollapse: "collapse", background: "#1e293b", borderRadius: 12 }}>
        <thead>
          <tr style={{ background: "#334155" }}>
            <th style={{ padding: 14, textAlign: "left" }}>Name</th>
            <th style={{ padding: 14, textAlign: "left" }}>Email</th>
            <th style={{ padding: 14, textAlign: "left" }}>Course</th>
            <th style={{ padding: 14, textAlign: "left" }}>Status</th>
            <th style={{ padding: 14, textAlign: "left" }}>Score</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} style={{ borderBottom: "1px solid #334155" }}>
              <td style={{ padding: 14 }}>{student.name}</td>
              <td style={{ padding: 14 }}>{student.email}</td>
              <td style={{ padding: 14 }}>{student.course}</td>
              <td style={{ padding: 14 }}>
                <span
                  style={{
                    padding: "4px 12px",
                    borderRadius: 20,
                    fontSize: 13,
                    background:
                      student.status === "Active"
                        ? "#064e3b"
                        : student.status === "Completed"
                        ? "#1e3a8a"
                        : "#7c2d12",
                    color:
                      student.status === "Active"
                        ? "#6ee7b7"
                        : student.status === "Completed"
                        ? "#93c5fd"
                        : "#fdba74",
                  }}
                >
                  {student.status}
                </span>
              </td>
              <td style={{ padding: 14 }}>{student.score}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      {students.length === 0 && (
        <p style={{ textAlign: "center", marginTop: 40, color: "#94a3b8" }}>
          No students found
        </p>
      )}
    </div>
  );
}