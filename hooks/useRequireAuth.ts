"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useRequireAuth(allowedRoles?: ("admin" | "student")[]) {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const role = localStorage.getItem("userRole") as "admin" | "student" | null;

    if (!isLoggedIn || !role) {
      router.push("/login");
      return;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
      // Wrong role → redirect to their correct home
      if (role === "admin") router.push("/dashboard");
      else router.push("/student-dashboard");
    }
  }, [router, allowedRoles]);
}