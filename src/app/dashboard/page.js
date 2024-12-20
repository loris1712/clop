"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import withAuth from "../hoc/withAuth";
import MenuAdmin from "../components/MenuAdmin";
import styles from './Dashboard.module.css';
import UserTable from "../components/UserTable";

function Dashboard() {
  const [usersData, setUsersData] = useState([]);
  const [listsData, setListsData] = useState([]);
  const [usersDataLength, setUsersDataLength] = useState([]);
  const [listsDataLength, setListsDataLength] = useState([]);
  const [usersSearch, setUsersSearch] = useState("");
  const [listsSearch, setListsSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [cardStatus, setCardStatus] = useState("pending");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        const users = usersSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt
              ? new Date(data.createdAt.seconds * 1000).toLocaleString()
              : "N/A",
          };
        });

        const listsSnapshot = await getDocs(collection(db, "lists"));
        const lists = listsSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            code: data.code || "N/A",
            event_date: data.timestamp
              ? new Date(data.timestamp.seconds * 1000).toLocaleString()
              : "N/A",
            type: data.type || "N/A",
          };
        });

        setUsersData(users);

        setListsData(lists);

        setUsersDataLength(users.length)
        setListsDataLength(lists.length)
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const sortData = (data, field, ascending = true) => {
    return [...data].sort((a, b) => {
      if (a[field] < b[field]) return ascending ? -1 : 1;
      if (a[field] > b[field]) return ascending ? 1 : -1;
      return 0;
    });
  };

  const filteredUsers = usersData.filter((user) =>
    Object.values(user).some((value) =>
      value?.toString().toLowerCase().includes(usersSearch.toLowerCase())
    )
  );

  const filteredLists = listsData.filter((list) =>
    ["code", "event_date", "type"].some((key) =>
      list[key]?.toString().toLowerCase().includes(listsSearch.toLowerCase())
    )
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSendCard = async (userCode) => {
    try {
      console.log(`Sending card for user: ${userCode}`);
      alert("Card sent successfully!");
    } catch (error) {
      console.error("Error sending card:", error);
      alert("Failed to send card. Please try again.");
    }
  };
  
  return (
    <div className="mt-[20rem] md:mt-[6rem]" style={{ padding: "20px", zIndex: 2 }}>
      <MenuAdmin />
      <h1 className="font-semibold text-[20px] text-center mb-6">CLEOPE Dashboard</h1>

      <UserTable users={filteredUsers} />

      {/* Lists Table */}
      <div className={`${styles.listTable} m-auto`} style={{ height: '15vw', overflowY: 'scroll', width: "80vw",}}>
        <h2 className="font-semibold">Lists - {listsDataLength}</h2>
        <input
          type="text"
          placeholder="Search in Lists"
          value={listsSearch}
          onChange={(e) => setListsSearch(e.target.value)}
          className="mt-2 bg-black border border-gray-700 rounded-lg px-3 py-2 text-white text-[12px] focus:outline-none focus:ring-0 focus:border-gray-700 w-full mb-4"
        />
        <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th className="mr-2 text-left pb-2" onClick={() => setListsData(sortData(listsData, "code"))}>Code</th>
              <th className="mr-2 text-left pb-2" onClick={() => setListsData(sortData(listsData, "event_date"))}>Event Date</th>
              <th className="mr-2 text-left pb-2">Email</th>
              <th className="mr-2 text-left pb-2">Instagram</th>
              <th className="mr-2 text-left pb-2" onClick={() => setListsData(sortData(listsData, "type"))}>Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredLists.map((list) => {
              const user = usersData.find((u) => u.userCode === list.code);
              return (
                <tr key={list.id}>
                  <td>{list.code}</td>
                  <td>{list.event_date}</td>
                  <td>
                    {user?.email ? <a href={`mailto:${user.email}`}>{user.email}</a> : "No email"}
                  </td>
                  <td>
                    {user?.instagram ? (
                      <a href={`https://instagram.com/${user.instagram}`} target="_blank" rel="noopener noreferrer">
                        {user.instagram}
                      </a>
                    ) : (
                      "No Instagram"
                    )}
                  </td>
                  <td>{list.type}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default withAuth(Dashboard);