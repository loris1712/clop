import { useEffect, useState } from "react";
import { collection, doc, setDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import styles from './Dashboard.module.css';

function UserTable({ users }) {
  const [cardStatuses, setCardStatuses] = useState({});
  const [loadingUsers, setLoadingUsers] = useState({});
  const [usersSearch, setUsersSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ field: "createdAt", direction: "asc" });
  const [sortedUsers, setSortedUsers] = useState(users); 

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

  useEffect(() => {
    const fetchCardStatuses = async () => {
      users.forEach(async (user) => {
        if (user.userCode) {
          try {
            setLoadingUsers((prev) => ({ ...prev, [user.userCode]: true })); 
            const q = query(
              collection(db, "users_cards"),
              where("userCode", "==", user.userCode)
            );
            const querySnapshot = await getDocs(q);

            setCardStatuses((prev) => ({
              ...prev,
              [user.userCode]: querySnapshot.empty
                ? "pending"
                : querySnapshot.docs[0].data().cardStatus || "pending",
            }));
          } catch (error) {
            console.error(`Error fetching status for user ${user.userCode}:`, error);
          } finally {
            setLoadingUsers((prev) => ({ ...prev, [user.userCode]: false })); 
          }
        }
      });
    };

    fetchCardStatuses();
  }, [users]);

  const handleSendCard = async (user, email) => {
    try {
      const userCardRef = doc(db, "users_cards", user.userCode);
      await setDoc(userCardRef, {
        cardStatus: "received",
        userCode: user.userCode,
      }, { merge: true });  

      console.log(`Card status updated or created for userCode: ${user.userCode}`);
      
      // Crea l'oggetto email
      const subject = "Approvato nella lista CLEOPE - VOLT 12 Dicembre";
      const htmlContent = `
        <h1>Benvenuto in CLEOPE!</h1>
        <p>Sei stato approvato per la lista CLEOPE per il VOLT all'evento 12 Dicembre 2024, e la tua fidelity card è pronta!</p>
        <p><strong>Attenzione:</strong> L'approvazione della card non garantisce l'ingresso, poiché ci sarà una selezione finale all'ingresso da parte della sicurezza, basata sul dresscode.</p>
        <p>Puoi visualizzare e utilizzare la tua fidelity card al seguente link:</p>
        <a href="https://cleope-sigma.vercel.app/home?userCode=${user.userCode}" style="color: #007bff;">
          https://cleope-sigma.vercel.app/home?userCode=${user.userCode}
        </a>
        <p>Grazie per esserti unito a CLEOPE! Ci vediamo presto.</p>
        <p><em>Team CLEOPE</em></p>
        <a href="https://www.instagram.com/cleopeofficial/" style="color: #007bff;">
          Seguici su Instagram
        </a>
        <a href="https://www.tiktok.com/@cleopeofficial?_t=ZN-8ry8NBWWrKA&_r=1" style="color: #007bff;">
          Seguici su TikTok
        </a>
      `;

      // Invia l'email
      await sendEmail({
        to: user.email,
        subject: subject,
        html: htmlContent,
      });

      console.log(`Card sent to ${user.email} for userCode: ${user.userCode}`);
      alert(`Card sent to ${user.email} for userCode: ${user.userCode}`);
    } catch (error) {
      console.error("Error sending card:", error);
      alert("Failed to send card. Please try again.");
    }
  };

  useEffect(() => {
    const sortData = () => {
      const sorted = [...users].sort((a, b) => {
        if (a[sortConfig.field] < b[sortConfig.field]) return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.field] > b[sortConfig.field]) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });

      setSortedUsers(sorted);
    };

    sortData(); 
  }, [sortConfig, users]); 

  const filteredUsers = sortedUsers.filter((user) =>
    Object.values(user).some((value) =>
      value?.toString().toLowerCase().includes(usersSearch.toLowerCase())
    )
  );

  const handleSort = (field) => {
    setSortConfig((prevConfig) => ({
      field,
      direction: prevConfig.field === field && prevConfig.direction === "asc" ? "desc" : "asc"
    }));
  };

  return (
    <div
      className={`${styles.userTable} m-auto`}
      style={{ marginBottom: "40px", width: "80vw", height: "15vw", overflowY: "scroll" }}
    >
      <h2 className="font-semibold">Users - {users.length}</h2>
      <input
        type="text"
        placeholder="Search in Users"
        value={usersSearch}
        onChange={(e) => setUsersSearch(e.target.value)}
        className="sticky top-0 mt-2 bg-black border border-gray-700 rounded-lg px-3 py-2 text-white text-[12px] focus:outline-none focus:ring-0 focus:border-gray-700 w-full mb-4"
      />

      <table className="md:table-fixed w-full" border="1" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th
              className="w-[20%] sticky top-9 bg-black text-white pb-2 pt-2 text-left cursor-pointer"
              onClick={() => handleSort("instagram")}
            >
              Instagram
            </th>
            <th
              className="w-[25%] sticky top-9 bg-black text-white pb-2 pt-2 text-left cursor-pointer"
              onClick={() => handleSort("email")}
            >
              Email
            </th>
            <th
              className="w-[20%] sticky top-9 bg-black text-white pb-2 pt-2 text-left cursor-pointer"
              onClick={() => handleSort("createdAt")}
            >
              Created At
            </th>
            <th
              className="w-[15%] sticky top-9 bg-black text-white pb-2 pt-2 text-left cursor-pointer"
              onClick={() => handleSort("userCode")}
            >
              User Code
            </th>
            <th
              className="w-[10%] sticky top-9 bg-black text-white pb-2 pt-2 text-left"
            >
              Status
            </th>
            <th className="w-[10%] sticky top-9 bg-black text-white pb-2 pt-2 text-left">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => {
            const cardStatus = cardStatuses[user.userCode] || "loading..."; // Default to loading if not available
            const isLoading = loadingUsers[user.userCode];

            return (
              <tr key={user.id} style={{ marginBottom: "1rem" }}>
                <td className="pr-8" style={{ padding: "0.5rem" }}>
                  {user.instagram ? (
                    <a
                      href={`https://instagram.com/${user.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {user.instagram}
                    </a>
                  ) : (
                    "No Instagram"
                  )}
                </td>
                <td className="pr-8" style={{ padding: "0.5rem" }}>
                  {user.email ? <a href={`mailto:${user.email}`}>{user.email}</a> : "No email"}
                </td>
                <td className="pr-8" style={{ padding: "0.5rem" }}>{user.createdAt}</td>
                <td className="pr-8" style={{ padding: "0.5rem" }}>{user.userCode}</td>
                <td className="pr-8 text-center" style={{ padding: "0.5rem" }}>
                  {isLoading ? "Loading..." : cardStatus}
                </td>
                <td style={{ padding: "0.5rem" }}>
                  {cardStatus === "received" ? (
                    <span>Received</span>
                  ) : (
                    <button
                      onClick={() => handleSendCard(user)}
                      className="bg-white text-black text-[12px] px-3 py-1 rounded-[100px] hover:bg-blue-600"
                      disabled={isLoading}
                    >
                      Send Card
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
