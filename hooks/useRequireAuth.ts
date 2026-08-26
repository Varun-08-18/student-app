"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useRequireAuth() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      router.push("/login");
    }
  }, [router]);
}