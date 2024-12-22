"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import styles from './Invitations.module.css';

function SendCardsPage() {
  const [invitedData, setInvitedData] = useState([]);
  const [requestedData, setRequestedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch invited data
        const invitedSnapshot = await getDocs(collection(db, "invitedby29dic"));
        const invited = invitedSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            email: data.email,
            userCode: doc.id, // Assuming userCode corresponds to the invited doc ID
          };
        });

        // Fetch requested invitation data
        const requestedSnapshot = await getDocs(collection(db, "requestedinvitation29dic"));
        const requested = requestedSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            userCode: doc.id, // Assuming userCode corresponds to the requested doc ID
          };
        });

        setInvitedData(invited);
        setRequestedData(requested);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const handleSendCard = async (email, userCode) => {
    try {
      // Verifica se la card esiste già o se deve essere creata
      const userCardRef = doc(db, "users_cards2", userCode);
      const userCardSnapshot = await getDoc(userCardRef);

      if (userCardSnapshot.exists()) {
        // Se la card esiste, aggiorna solo il cardStatus
        await setDoc(userCardRef, { cardStatus: "received" }, { merge: true });
        console.log(`Card status updated for userCode: ${userCode}`);

        // Aggiorna lo stato nella lista locale
        setInvitedData(prevData => prevData.map(invited => 
          invited.userCode === userCode ? { ...invited, cardStatus: "received" } : invited
        ));
        setRequestedData(prevData => prevData.map(requested => 
          requested.userCode === userCode ? { ...requested, cardStatus: "received" } : requested
        ));
      } else {
        // Se la card non esiste, crea un nuovo record
        await setDoc(userCardRef, {
          cardStatus: "received",
          userCode: email,
        });
        console.log(`Card status created for userCode: ${userCode}`);

        // Aggiorna lo stato nella lista locale
        setInvitedData(prevData => prevData.map(invited => 
          invited.userCode === userCode ? { ...invited, cardStatus: "received" } : invited
        ));
        setRequestedData(prevData => prevData.map(requested => 
          requested.userCode === userCode ? { ...requested, cardStatus: "received" } : requested
        ));
      }

      // Crea l'oggetto email
      const subject = "Grazie per il tuo interesse - La tua card CLEOPE per il Private Party del 29 Dicembre!";
      const htmlContent = `
        <h1>Benvenuto in CLEOPE!</h1>
        <p>Grazie per il tuo interesse nel nostro evento Private Party il 29 Dicembre 2024 al Safari Club di Salerno! La tua fidelity card è pronta.</p>
        <p><strong>Attenzione:</strong> La card non garantisce l'ingresso, poiché ci sarà una selezione finale all'ingresso da parte della sicurezza, basata sul dresscode.</p>
        <p>Puoi visualizzare e utilizzare la tua fidelity card al seguente link:</p>
        <a href="https://cleope-sigma.vercel.app/home?userCode=${userCode}" style="color: #007bff;">
          https://cleope-sigma.vercel.app/home?userCode=${userCode}
        </a>
        <p>Grazie per esserti unito a CLEOPE! Ci vediamo presto.</p>
        <p><em>Team CLEOPE</em></p>
        <p><a href="https://www.instagram.com/cleopeofficial/" style="color: #007bff;">Seguici su Instagram</a></p>
        <p><a href="https://www.tiktok.com/@cleopeofficial?_t=ZN-8ry8NBWWrKA&_r=1" style="color: #007bff;">Seguici su TikTok</a></p>
      `;

      // Invia l'email
      await sendEmail({
        to: email,
        subject: subject,
        html: htmlContent,
      });

      console.log(`Card sent to ${email} for userCode: ${userCode}`);
      alert(`Card sent to ${email} for userCode: ${userCode}`);
    } catch (error) {
      console.error("Error sending card:", error);
      alert("Failed to send card. Please try again.");
    }
  };

  const fetchCardStatus = async (userCode) => {
    try {
      const userCardRef = doc(db, "users_cards2", userCode);
      const userCardSnapshot = await getDoc(userCardRef);

      if (userCardSnapshot.exists()) {
        return userCardSnapshot.data().cardStatus || "not received";
      } else {
        return "not received";
      }
    } catch (error) {
      console.error("Error fetching card status:", error);
      return "not received";
    }
  };

  useEffect(() => {
    const updateCardStatuses = async () => {
      const updatedInvitedData = await Promise.all(
        invitedData.map(async (invited) => {
          const cardStatus = await fetchCardStatus(invited.userCode);
          return { ...invited, cardStatus };
        })
      );

      const updatedRequestedData = await Promise.all(
        requestedData.map(async (requested) => {
          const cardStatus = await fetchCardStatus(requested.userCode);
          return { ...requested, cardStatus };
        })
      );

      setInvitedData(updatedInvitedData);
      setRequestedData(updatedRequestedData);
    };

    if (!loading) {
      updateCardStatuses();
    }
  }, [invitedData, requestedData, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-[20rem] md:mt-[6rem]" style={{ padding: "20px", zIndex: 2 }}>
      <h1 className="font-semibold text-[20px] text-center mb-6">Send Cards Page</h1>

      {/* Invited by 29dic Table */}
      <div className={`${styles.listTable} m-auto`} style={{ height: '15vw', overflowY: 'scroll', width: "80vw" }}>
        <h2 className="font-semibold">Invited by 29dic - {invitedData.length}</h2>
        <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th className="mr-2 text-left pb-2">Email</th>
              <th className="mr-2 text-left pb-2">Card Status</th>
              <th className="mr-2 text-left pb-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {invitedData.map((invited) => (
              <tr key={invited.id}>
                <td>{invited.email}</td>
                <td>{invited.cardStatus}</td>
                <td>
                  <button
                    onClick={() => handleSendCard(invited.email, invited.userCode)}
                    className="bg-blue-500 text-white px-3 py-2 rounded"
                  >
                    Send Card
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Requested Invitations Table */}
      <div className={`${styles.listTable} m-auto`} style={{ height: '15vw', overflowY: 'scroll', width: "80vw" }}>
        <h2 className="font-semibold">Requested Invitations - {requestedData.length}</h2>
        <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th className="mr-2 text-left pb-2">Email</th>
              <th className="mr-2 text-left pb-2">First Name</th>
              <th className="mr-2 text-left pb-2">Last Name</th>
              <th className="mr-2 text-left pb-2">Card Status</th>
              <th className="mr-2 text-left pb-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {requestedData.map((requested) => (
              <tr key={requested.id}>
                <td>{requested.email}</td>
                <td>{requested.firstName}</td>
                <td>{requested.lastName}</td>
                <td>{requested.cardStatus}</td>
                <td>
                  <button
                    onClick={() => handleSendCard(requested.email, requested.userCode)}
                    className="bg-blue-500 text-white px-3 py-2 rounded"
                  >
                    Send Card
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default SendCardsPage;
