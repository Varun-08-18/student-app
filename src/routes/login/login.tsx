"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const router = useRouter();

  const handleLogin = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      email === "admin@test.com" &&
      password === "123456"
    ) {
      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      router.push("/dashboard");
    } else {
      alert("Wrong email or password");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f4f8f6",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          background: "#ffffff",
          padding: 40,
          borderRadius: 12,
          width: 360,
        }}
      >
        <h2
          style={{
            color: "#183b36",
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          Student App Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 16,
            borderRadius: 6,
            border: "none",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 20,
            borderRadius: 6,
            border: "none",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 12,
            background: "#167c6a",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}