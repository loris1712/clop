"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import withAuth from "../hoc/withAuth";
import MenuAdmin from "../components/MenuAdmin";
import styles from './Dashboard.module.css';

function Dashboard() {
  const [usersData, setUsersData] = useState([]);
  const [listsData, setListsData] = useState([]);
  const [usersDataLength, setUsersDataLength] = useState([]);
  const [listsDataLength, setListsDataLength] = useState([]);
  const [usersSearch, setUsersSearch] = useState("");
  const [listsSearch, setListsSearch] = useState("");
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

  return (
    <div style={{ padding: "20px", zIndex: 2 }}>
      <MenuAdmin />
      <h1 className="font-semibold text-[20px] text-center mb-6">CLEOPE Dashboard</h1>

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
                <td className="pr-8">
                  {user.email ? <a href={`mailto:${user.email}`}>{user.email}</a> : "No email"}
                </td>
                <td className="pr-8">
                  {user.instagram ? (
                    <a href={`https://instagram.com/${user.instagram}`} target="_blank" rel="noopener noreferrer">
                      {user.instagram}
                    </a>
                  ) : (
                    "No Instagram"
                  )}
                </td>
                <td className="pr-8">{user.userCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Lists Table */}
      <div className="m-auto" style={{ height: '15vw', overflowY: 'scroll', width: "80vw",}}>
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