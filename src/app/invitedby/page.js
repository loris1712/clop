"use client";

import { useState } from "react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";

export default function InvitationPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      // Controlla se l'email esiste già
      const q = query(collection(db, "invitedby29dic"), where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setError("Email giá registrata.");
        return;
      }

      // Aggiungi l'email al database
      await addDoc(collection(db, "invitedby29dic"), { email });

      // Reindirizzamento con parametro dinamico
      router.push(`/thankyou?text=Grazie per esserti registrato!`);
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        color: "#333",
        textAlign: "center",
        padding: "20px",
        zIndex: 2,
      }}
    >
      <header className="mb-6">
        <div className="w-40 h-40 rounded-full flex items-center justify-center">
          <img src="/logo.svg" alt="Logo" className="h-24 w-auto" />
        </div>
      </header>
      <h1 className="text-white" style={{ fontSize: "24px", fontWeight: "700" }}>
        CLEOPE - Private Party
      </h1>

      <h1
        className="text-[#fff] mt-2"
        style={{ fontSize: "14px",fontWeight: "300" }}
      >
        Sei stato invitato al Fashion Party CLEOPE,
      </h1>
      <h1
        className="text-[#fff]"
        style={{ fontSize: "14px",fontWeight: "300" }}
      >
      lascia la tua email per ricevere la fidelity card di accesso.
      </h1>
      <form
        onSubmit={handleEmailSubmit}
        style={{
          borderRadius: "20px",
          padding: "20px",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
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
        <button
          type="submit"
          className="bg-white rounded-[100px] hover:brightness-110 text-black py-3 px-8 font-semibold text-[11px]"
        >
          Accetta invito
        </button>
      </form>

      <div className="flex items-center gap-6 md:gap-10 mt-8">
        <div className="py-2" style={{ borderTop: "0.5px solid #ffffff6e", textAlign: "left" }}>
          <p className="text-[8px] font-light text-white uppercase mt-2" style={{ letterSpacing: "1.5px" }}>
            Data
          </p>
          <div className="flex items-center">
            <p className="md:text-[32px] text-[28px] font-semibold text-white">29</p>
            <div>
              <p className="ml-2 text-[8px] font-light text-white uppercase">dic</p>
              <p className="ml-2 text-[8px] font-light text-white uppercase">2024</p>
            </div>
          </div>
        </div>

        <div className="py-2" style={{ borderTop: "0.5px solid #ffffff6e", textAlign: "left" }}>
          <p className="text-[8px] font-light text-white uppercase mt-2" style={{ letterSpacing: "1.5px" }}>
            Orario
          </p>
          <div className="flex items-center">
            <p className="md:text-[32px] text-[28px] font-semibold text-white">21:00</p>
            <div>
              <p className="ml-2 text-[8px] font-light text-white uppercase">-</p>
              <p className="ml-2 text-[8px] font-light text-white uppercase">00:00</p>
            </div>
          </div>
        </div>

        <div className="py-2" style={{ borderTop: "0.5px solid #ffffff6e", textAlign: "left" }}>
          <p className="text-[8px] font-light text-white uppercase mt-2" style={{ letterSpacing: "1.5px" }}>
            luogo
          </p>
          <a
            href="https://maps.google.com/?q=Safari+club+salerno"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "blue" }}
          >
            <div className="flex items-center">
              <p className="md:text-[32px] text-[28px] font-semibold text-[#fff]">Safari</p>
              <div>
                <p className="ml-2 text-[8px] font-light text-[#fff] uppercase">club</p>
                <p className="ml-2 text-[8px] font-light text-[#fff] uppercase">salerno</p>
              </div>
            </div>
          </a>
        </div>
      </div>

      <div className="flex items-center gap-6 md:gap-10 mt-8">
  <div 
    className="py-2 "
  >
    <p 
      className="text-[11px] font-light text-white uppercase mt-2 text-center" 
      style={{ letterSpacing: "1.5px" }}
    >
      Cleope organizza eventi privati con DJset & Fashion Brands.
    </p>
    <p className="text-white mt-4 text-[11px] font-light">
      Informazioni di servizio
    </p>
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 text-[11px] text-white text-left px-4">
      <li>Ingresso su invito</li>
      <li>Fashion Brands Exhibition</li>
      <li>Aperitif Post Dinner 21:00 - 00:00</li>
      <li>Ospiti, DJset & Show</li>
      <li>Make-Up Artist Exhibition</li>
    </ul>
    <p className="text-[11px] font-light text-white uppercase mt-4 text-center" 
    style={{ letterSpacing: "1.5px" }}
    >
        Contattaci per info e listino champagneria: &nbsp;
        <a href="https://www.instagram.com/cleopeofficial" target="_blank" rel="noopener noreferrer" className="text-blue-400">@cleopeofficial</a>.
      </p>
  </div>
</div>


      <p style={{ marginTop: "40px", fontSize: "12px", color: "#888" }}>
        © Copyright 2025 CLEOPE
      </p>
    </div>
  );
}
