"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";

interface AppContextType {
  userName: string;
  userRole: "admin" | "student" | null;
}

const AppContext = createContext<AppContextType>({
  userName: "User",
  userRole: null,
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState("User");
  const [userRole, setUserRole] = useState<"admin" | "student" | null>(null);

  useEffect(() => {
    const role = localStorage.getItem("userRole") as "admin" | "student" | null;
    const email = localStorage.getItem("userEmail");

    setUserRole(role);

    if (role === "admin") {
      setUserName("Admin");
    } else if (role === "student") {
      // You can also show the student's first name later if you want
      setUserName("Student");
    } else {
      setUserName("User");
    }
  }, []);

  return (
    <AppContext.Provider value={{ userName, userRole }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);