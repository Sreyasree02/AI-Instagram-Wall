"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [count, setCount] = useState(0);
  const router = useRouter();

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "Arial",
        backgroundColor: "#f5f5f5",
      }}
    >
      <h1
        style={{
          color: "#0070f3",
          fontSize: "48px",
          marginBottom: "20px",
        }}
      >
        AI Instagram Wall
      </h1>

      <p style={{ fontSize: "20px", marginBottom: "30px" }}>
        Welcome to our AI-powered Instagram Wall Project 🚀
      </p>

      <button
  onClick={() => router.push("/wall")}
  style={{
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "18px",
    cursor: "pointer",
  }}
>
  Get Started
</button>
    </main>
  );
}