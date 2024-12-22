"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import withAuth from "../hoc/withAuth";
import MenuAdmin from "../components/MenuAdmin";
import styles from './Dashboard.module.css';

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

function Emails() {
  const [usersData, setUsersData] = useState([]);
  const [uniqueEmails, setUniqueEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        const users = usersSnapshot.docs.map((doc) => doc.data());

        // Estrai email univoche
        const emails = Array.from(new Set(users.map(user => user.email)));

        setUsersData(users);
        setUniqueEmails(emails);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSendInvites = async () => {
    try {
      const subject = "CLEOPE - 12 Dicembre Milano";
      const htmlContent = `
        <h1>Fashion & Night Party CLEOPE</h1>
        <p>Ti ricordiamo l'evento di questa sera:</p>
        <ul>
          <li><strong>Fashion Party</strong>: dalle 22:00 alle 00:00 presso <em>Bottini Milano</em> (ingresso libero)</li>
          <li><strong>Night Party</strong>: dalle 00:00 al <em>VOLT</em> (selezione all'ingresso)</li>
        </ul>

        <p>Al VOLT dire Lista CLEOPE.</p>

        <p>Per informazioni sugli ultimi tavoli VOLT, scrivici a: <a href="mailto:cleope.events@gmail.com">cleope.events@gmail.com</a></p>
        <p>Seguici su Instagram e TikTok:</p>
        <ul>
          <li><a href="https://www.instagram.com/cleopeofficial/" style="color: #007bff;">Instagram</a></li>
          <li><a href="https://www.tiktok.com/@cleopeofficial?_t=ZN-8ry8NBWWrKA&_r=1" style="color: #007bff;">TikTok</a></li>
        </ul>
        <p><em>Team CLEOPE</em></p>
      `;

      for (const email of uniqueEmails) {
        await sendEmail({
          to: email,
          subject,
          html: htmlContent,
        });
      }

      alert("Email inviate con successo a tutti gli utenti univoci!");
    } catch (error) {
      console.error("Errore nell'invio delle email:", error);
      alert("Errore nell'invio delle email. Riprova più tardi.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-[20rem] md:mt-[6rem]" style={{ padding: "20px", zIndex: 2 }}>
      <MenuAdmin />
      <h1 className="font-semibold text-[20px] text-center mb-6">CLEOPE Dashboard</h1>
      <div className="text-center mb-4">
        <h2>Email univoche trovate: {uniqueEmails.length}</h2>
        <button
          onClick={handleSendInvites}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          Invia Email a Tutti
        </button>
      </div>
    </div>
  );
}

export default withAuth(Emails);
