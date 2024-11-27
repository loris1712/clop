"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation"; // Corretto per App Directory
import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Corretto per App Directory

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard"); // Reindirizzamento dopo login
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "rgb(0 0 0 / 0%)",
        color: "#fff",
        zIndex: 2,
        textAlign: "center",
      }}
    >
      <header className="mb-12">
        <div className="w-40 h-40 bg-transparent rounded-full flex items-center justify-center">
          <img src="/logo.svg" alt="Logo" className="h-24 w-auto" />
        </div>
      </header>
      <h1 style={{ fontSize: "24px", marginBottom: "20px", fontWeight: '700' }}>
        Login CLEOPE World
      </h1>
      <form
        onSubmit={handleLogin}
        style={{
          backgroundColor: "#030303b5",
          border: "1px solid #ffffff33",
          borderRadius: "20px",
          padding: "20px",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-black border border-gray-700 rounded-lg px-3 py-2 text-white text-[12px] focus:outline-none focus:ring-0 focus:border-gray-700 w-full mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-black border border-gray-700 rounded-lg px-3 py-2 text-white text-[12px] focus:outline-none focus:ring-0 focus:border-gray-700 w-full mb-4"
        />
        <button
          type="submit"
          className="bg-white rounded-[100px] hover:brightness-110 text-black py-3 px-8 font-semibold text-[11px] w-full"
        >
          Login
        </button>
      </form>
      <p style={{ marginTop: "20px", fontSize: "12px", color: "#888" }}>
        © Copyright 2025 CLEOPE
      </p>
    </div>
  );
}
