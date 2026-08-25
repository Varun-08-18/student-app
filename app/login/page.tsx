"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@test.com" && password === "123456") {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/dashboard");
    } else {
      alert("Wrong email or password");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#0f172a" }}>
      <form onSubmit={handleLogin} style={{ background: "#1e293b", padding: 40, borderRadius: 12, width: 360 }}>
        <h2 style={{ color: "white", textAlign: "center", marginBottom: 24 }}>Student App Login</h2>
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: 12, marginBottom: 16, borderRadius: 6, border: "none" }}
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: 12, marginBottom: 20, borderRadius: 6, border: "none" }}
        />
        
        <button type="submit" style={{ width: "100%", padding: 12, background: "#3b82f6", color: "white", border: "none", borderRadius: 6, cursor: "pointer" }}>
          Login
        </button>

        <p style={{ color: "#94a3b8", fontSize: 13, textAlign: "center", marginTop: 16 }}>
          admin@test.com / 123456
        </p>
      </form>
    </div>
  );
}