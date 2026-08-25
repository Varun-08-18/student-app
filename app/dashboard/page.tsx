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
  }, []);

  const total = students.length;
  const active = students.filter((s) => s.status === "Active").length;
  const completed = students.filter((s) => s.status === "Completed").length;
  const avgScore = total > 0 ? Math.round(students.reduce((sum, s) => sum + (s.score || 0), 0) / total) : 0;

  return (
    <AppLayout>   {/* ← yahan se start */}
