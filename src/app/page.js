"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Popup from "./components/Popup";
import { collection, addDoc, doc, getDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Home() {
  const [activePopup, setActivePopup] = useState(null);
  const router = useRouter();

  const sendEmail = async (emailData) => {
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Email inviata:', data);
      } else {
        console.error('Errore nell\'invio dell\'email:', data);
      }
    } catch (error) {
      console.error('Errore nella richiesta:', error);
    }
  };

  // Aggiungi questo useEffect per controllare la presenza di "code" nell'URL
  useEffect(() => {
    const checkCodeInURL = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      
      if (code) {
        try {
          const codeQuery = query(collection(db, "users"), where("userCode", "==", code));
          const codeSnapshot = await getDocs(codeQuery);

          if (!codeSnapshot.empty) {
            // Reindirizza a /home se il codice è valido
            //alert("Codice valido! Reindirizzamento in corso...");
            router.push("/home");
          } else {
            alert("Invalid code. Please check and try again.");
          }
        } catch (error) {
          console.error("Errore durante il controllo del codice:", error);
        }
      }
    };

    checkCodeInURL();
  }, [router]);

  const handleSaveCode = async (data, type) => {
    try {
      if (type === "session") {

        const userCodeQuery = query(
          collection(db, "users"),
          where("userCode", "==", data)
        );
        const userCodeSnapshot = await getDocs(userCodeQuery);

        if (!userCodeSnapshot.empty) {
          //alert("Login eseguito con successo!");
          setActivePopup(null);
          router.push("/home");
        } else {
          alert("Code not found.");
        }
      } else if (type === "request") {
        const emailQuery = query(
          collection(db, "users"),
          where("email", "==", data.email)
        );
        const emailSnapshot = await getDocs(emailQuery);
        const instagramQuery = query(
          collection(db, "users"),
          where("instagram", "==", data.instagram)
        );
        const instagramSnapshot = await getDocs(instagramQuery);

        if (!emailSnapshot.empty) {
          alert("This email is already in use!");
          return;
        }

        if (!instagramSnapshot.empty) {
          alert("This Instagram is already in use!");
          return;
        }
        const uniqueCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        await addDoc(collection(db, "users"), {
          ...data,
          userCode: uniqueCode,
          createdAt: serverTimestamp(),
        });

        // Invia l'email con il codice
        alert(`Your code is ${uniqueCode}. We just sent you an email.`);
        sendEmail({
          to: data.email,
          subject: "Benvenuto in CLEOPE: Il tuo codice di accesso esclusivo",
          text: `Ecco il tuo codice: ${uniqueCode}`,
          html: `<h1>Benvenuto in CLEOPE!</h1>
            <p><strong>Il tuo codice è:</strong> <span style="font-size: 24px; color: #0049ff;">${uniqueCode}</span></p>
            <p>Clicca sul link qui sotto per utilizzare il tuo codice e accedere ai nostri eventi sulla piattaforma:</p>
            <a href="http://localhost:3000?code=${uniqueCode}" style="color: #007bff;">http://localhost:3000?code=${uniqueCode}</a>
            <p>Grazie per esserti unito a CLEOPE!</p>`,
        });        

        setActivePopup(null);
      } else {
          // Caso per "lists"
        
          const listQuery = query(
            collection(db, "lists"),
            where("code", "==", data),
            where("event_date", "==", "12 December 2024"),
            where("type", "==", type)
          );
          const listSnapshot = await getDocs(listQuery);
        
          if (!listSnapshot.empty) {
            alert(`The code is already present for this event with the type ${type}.`);
            return;
          }
        
          await addDoc(collection(db, "lists"), {
            code: data,
            type,
            timestamp: serverTimestamp(),
            event_date: "12 Dicembre 2024",
          });
        
          alert(`Code saved in ${type}. We just sent you an email.`);
          setActivePopup(null);
        
          // Cerca l'email corrispondente al codice nella tabella "users"
          const userQuery = query(
            collection(db, "users"),
            where("userCode", "==", data) // Cerca per userCode uguale al codice
          );
          const userSnapshot = await getDocs(userQuery);
        
          if (!userSnapshot.empty) {
            const userData = userSnapshot.docs[0].data(); // Prendi il primo risultato
            const userEmail = userData.email; // Estrapola l'email
        
            // Controlla il tipo e invia l'email corrispondente
            if (type === "lista") {
              sendEmail({
                to: userEmail,
                subject: "Sei nella lista CLEOPE per VOLT",
                text: `Grazie per esserti unito alla lista CLEOPE per l'evento VOLT del 12 Dicembre 2024.`,
                html: `
                  <h1>Grazie per esserti unito alla lista CLEOPE per VOLT!</h1>
                  <p>Caro Ospite,</p>
                  <p>Ora sei ufficialmente nella lista CLEOPE per l'evento VOLT del <strong>12 Dicembre 2024</strong>.</p>
                  <p>Ti ricordiamo che essere nella lista non garantisce l'ingresso, in quanto ci sarà un processo di selezione all'ingresso per tutti i partecipanti.</p>
                  <p>Rimani aggiornato per ulteriori comunicazioni via email!</p>
                  <p><em>Team CLEOPE</em></p>
                `,
              });              
            } else if (type === "tavoli") {
              sendEmail({
                to: userEmail,
                subject: "Richiesta di prenotazione tavolo CLEOPE",
                text: `Grazie per il tuo interesse nella prenotazione di un tavolo per l'evento VOLT del 12 Dicembre 2024.`,
                html: `
                  <h1>Grazie per il tuo interesse nella prenotazione di un tavolo!</h1>
                  <p>Caro Ospite,</p>
                  <p>La tua richiesta di prenotazione di un tavolo per l'evento VOLT del <strong>12 Dicembre 2024</strong> è stata ricevuta.</p>
                  <p>Il nostro team ti contatterà a breve per finalizzare la prenotazione.</p>
                  <p><em>Team CLEOPE</em></p>
                `,
              });              
            }
          } else {
            console.error("No user found with the provided code.");
          }
                
      }
    } catch (error) {
      console.error("Errore:", error);
      alert("Error during the operation.");
    }
  };

  return (
    <div className="text-white min-h-screen flex flex-col items-center justify-center px-4" style={{ zIndex: 2 }}>
      {/* Logo */}
      <header className="mb-12">
        <div className="w-40 h-40 bg-transparent rounded-full flex items-center justify-center">
          <img src="/logo.svg" alt="Logo" className="h-24 w-auto" />
        </div>
      </header>

      {/* Buttons */}
      <main className="w-full max-w-sm flex flex-col gap-4">
        <button
          onClick={() => setActivePopup("login")}
          className="bg-[#2b2b2b] rounded-[100px] hover:brightness-110 text-white py-3 px-8 font-semibold text-[11px]"
        >
          Insert Your Code To Access
        </button>
        <button
          onClick={() => setActivePopup("request")}
          className="bg-[#2b2b2b] rounded-[100px] hover:brightness-110 text-white py-3 px-8 font-semibold text-[11px]"
        >
          Request Your Code
        </button>
        <button
          onClick={() => setActivePopup("volt")}
          className="bg-white rounded-[100px] hover:brightness-110 text-black py-3 px-8 font-semibold text-[11px]"
        >
          VOLT Access
        </button>
      </main>

      {/* Popup */}
      {activePopup && (
        <Popup
          type={activePopup}
          onClose={() => setActivePopup(null)}
          onSaveCode={handleSaveCode}
          onSwitchPopUp={() => setActivePopup("request")}
        />
      )}
    </div>
  );
}
