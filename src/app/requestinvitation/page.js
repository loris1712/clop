"use client";

import { useState } from "react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";

export default function RequestInvitaton() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Verifica se tutti i campi sono compilati
    if (!email || !firstName || !lastName) {
      setError("All fields are required");
      return;
    }

    try {
      // Controlla se l'email è già presente nel database
      const q = query(
        collection(db, "requestedinvitation29dic"),
        where("email", "==", email)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Se l'email esiste già
        setError("This email has already requested an invitation.");
        return;
      }

      // Se l'email non è presente, aggiungi la richiesta
      await addDoc(collection(db, "requestedinvitation29dic"), {
        email,
        firstName,
        lastName,
        timestamp: new Date(),
      });

      // Reindirizza alla pagina di ringraziamento con un messaggio dinamico
      const message = `Grazie per aver richiesto l'accesso al CLEOPE Private Party del 29 dicembre.`;
      router.push(`/thankyou?text=${encodeURIComponent(message)}`);
    } catch (err) {
      setError("An error occurred. Please try again.");
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

      <h2 className="text-[#888]" style={{ fontSize: "14px", marginBottom: "20px", fontWeight: "300" }}>
        Fashion Party
      </h2>

      <form
        onSubmit={handleFormSubmit}
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
          type="text"
          placeholder="Nome"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="bg-black border border-gray-700 rounded-lg px-3 py-2 text-white text-[12px] focus:outline-none focus:ring-0 focus:border-gray-700 w-full mb-4"
        />
        <input
          type="text"
          placeholder="Cognome"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="bg-black border border-gray-700 rounded-lg px-3 py-2 text-white text-[12px] focus:outline-none focus:ring-0 focus:border-gray-700 w-full mb-4"
        />
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
          Richiedi invito
        </button>
      </form>

      <div className="flex items-center gap-6 md:gap-10 mt-8">
        <div className="py-2" style={{ borderTop: "0.5px solid #ffffff6e", textAlign: "left" }}>
          <p className="text-[8px] font-light text-white uppercase mt-2" style={{ letterSpacing: "1.5px" }}>
            data
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
            Luogo
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
