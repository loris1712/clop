'use client';

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ThankYouPage() {
  const [isClient, setIsClient] = useState(false); // Stato per determinare se siamo lato client
  const searchParams = useSearchParams();
  const text = searchParams.get("text"); // Recupera il parametro 'text' dall'URL

  // Effettua il controllo lato client e imposta lo stato
  useEffect(() => {
    setIsClient(true); // Impostiamo lo stato a true quando il componente è montato nel client
  }, []);

  // Se non siamo lato client, mostriamo un messaggio di caricamento
  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        color: "#333",
        textAlign: "center",
        padding: "20px",
        zIndex: 2,
      }}
    >
      <header className="mb-12">
        <div className="w-40 h-40 rounded-full flex items-center justify-center">
          <img src="/logo.svg" alt="Logo" className="h-24 w-auto" />
        </div>
      </header>
      <h1 className="text-white" style={{ fontSize: "24px", fontWeight: "700" }}>
        CLEOPE - Private Party
      </h1>
      <h2
        className="text-white"
        style={{ fontSize: "16px", fontWeight: "500", marginTop: "0.5rem" }}
      >
        {text || "Thank you!"}
      </h2>

      <a
        href="https://www.instagram.com/cleopeofficial/"
        style={{
          backgroundColor: "white",
          color: "#000",
          padding: "10px 20px",
          borderRadius: "50px",
          textDecoration: "none",
          fontWeight: "600",
          fontSize: "14px",
          marginTop: '1rem'
        }}
      >
        Seguici su IG
      </a>
      <p style={{ marginTop: "40px", fontSize: "12px", color: "#888" }}>
        © Copyright 2025 CLEOPE
      </p>
    </div>
  );
}
