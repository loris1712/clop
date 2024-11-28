"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import withAuth from "../hoc/withAuth";
import MenuAdmin from "../components/MenuAdmin";
import styles from './Dashboard.module.css';

function Users() {
  const [usersData, setUsersData] = useState([]);
  const [listsData, setListsData] = useState([]);
  const [usersSearch, setUsersSearch] = useState("");
  const [listsSearch, setListsSearch] = useState("");
  const [usersDataLength, setUsersDataLength] = useState([]);
  const [loading, setLoading] = useState(true);

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
              : "N/A", // Converte Timestamp in stringa leggibile o mostra "N/A" se assente
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
              : "N/A", // Converte Timestamp in stringa leggibile o mostra "N/A" se assente
            type: data.type || "N/A",
          };
        });

        setUsersData(users);
        setListsData(lists);
        setUsersDataLength(users.length)
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Funzione di ordinamento (con possibilità di ordinare in ordine crescente o decrescente)
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

  console.log(listsData)

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px", zIndex: 2}}>
      <MenuAdmin />
      <h1 className="font-semibold text-[20px] text-center mb-6">CLEOPE Users</h1>
 
      {/* Users Table */}
      <div className="m-auto" style={{ marginBottom: "40px", width: "80vw", height: '15vw', overflowY: 'scroll' }}>
        <h2 className="font-semibold">Users - {usersDataLength}</h2>
        <input
          type="text"
          placeholder="Search in Users"
          value={usersSearch}
          onChange={(e) => setUsersSearch(e.target.value)}
          className="mt-2 bg-black border border-gray-700 rounded-lg px-3 py-2 text-white text-[12px] focus:outline-none focus:ring-0 focus:border-gray-700 w-full mb-4"
        />
        <table className="" border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {/* Ordinamento per le colonne specificate */}
              <th className="mr-2 text-left pb-2" onClick={() => setUsersData(sortData(usersData, "createdAt"))}>Created At</th>
              <th className="mr-2 text-left pb-2" onClick={() => setUsersData(sortData(usersData, "email"))}>Email</th>
              <th className="mr-2 text-left pb-2" onClick={() => setUsersData(sortData(usersData, "instagram"))}>Instagram</th>
              <th className="mr-2 text-left pb-2" onClick={() => setUsersData(sortData(usersData, "userCode"))}>User Code</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="pr-8">{user.createdAt}</td>
                <td className="pr-8">{user.email}</td>
                <td className="pr-8">{user.instagram}</td>
                <td className="pr-8">{user.userCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default withAuth(Users);
