"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, doc, setDoc, updateDoc, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import withAuth from "../hoc/withAuth";
import MenuAdmin from "../components/MenuAdmin";

function Lists() {
  const [usersData, setUsersData] = useState([]);
  const [listsData, setListsData] = useState([]);
  const [usersSearch, setUsersSearch] = useState("");
  const [listsSearch, setListsSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [collapsedTables, setCollapsedTables] = useState({
    tables: false,
    lists: false,
  });

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

        const attendeesSnapshot = await getDocs(collection(db, "attendees"));
        const attendees = attendeesSnapshot.docs.map((doc) => doc.data());

        const listsWithStatus = lists.map((list) => {
          const attendee = attendees.find(
            (att) => att.listId === list.id && att.code === list.code
          );
          return {
            ...list,
            entered: attendee ? attendee.entered : false,
          };
        });

        setUsersData(users);
        setListsData(listsWithStatus);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleTable = (table) => {
    setCollapsedTables((prevState) => ({
      ...prevState,
      [table]: !prevState[table],
    }));
  };

  const toggleAttendeeStatus = async (listId, userId, entered, eventDate, code) => {
    try {
      const attendeesRef = collection(db, "attendees");
      const q = query(attendeesRef, where("listId", "==", listId), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (docSnap) => {
          const attendeeRef = doc(db, "attendees", docSnap.id);
          await updateDoc(attendeeRef, {
            entered: entered,
            eventDate: eventDate,
            code: code,
          });
        });
      } else {
        const newAttendeeRef = doc(collection(db, "attendees"));
        await setDoc(newAttendeeRef, {
          listId: listId,
          userId: userId,
          entered: entered,
          eventDate: eventDate,
          code: code,
        });
      }

      setListsData((prevLists) =>
        prevLists.map((list) =>
          list.id === listId ? { ...list, entered: entered } : list
        )
      );
    } catch (error) {
      console.error("Error updating/adding attendee status:", error);
    }
  };

  const filteredUsers = usersData.filter((user) =>
    Object.values(user).some((value) =>
      value?.toString().toLowerCase().includes(usersSearch.toLowerCase())
    )
  );

  const filteredTables = listsData.filter(
    (list) =>
      list.type === "tavoli" &&
      ["code", "event_date", "type"].some((key) =>
        list[key]?.toString().toLowerCase().includes(usersSearch.toLowerCase())
      )
  );

  const filteredLists = listsData.filter(
    (list) =>
      list.type === "lista" &&
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
      <h1 className="font-semibold text-[20px] text-center">VOLT | CLEOPE Tables & Lists</h1>

      <div className="w-[80vw]">
      <div className="flex align-center">
        <h2 className="font-semibold">Tables</h2>
        <button onClick={() => toggleTable("tables")} className="font-regular mb-4 ml-auto">
          {collapsedTables.tables ? "Show Tables" : "Hide Tables"}
        </button>

        </div>
        {!collapsedTables.tables && (
          <>
            <input
              type="text"
              placeholder="Search in Tables"
              value={usersSearch}
              onChange={(e) => setUsersSearch(e.target.value)}
              className="mt-2 bg-black border border-gray-700 rounded-lg px-3 py-2 text-white text-[12px] focus:outline-none focus:ring-0 focus:border-gray-700 w-full mb-4"
            />
            <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th className="text-left">Code</th>
                  <th className="text-left">Email</th>
                  <th className="text-left">Event Date</th>
                  <th className="text-left">Type</th>
                </tr>
              </thead>
              <tbody>
                {filteredTables.map((table) => {
                  const user = usersData.find((u) => u.userCode === table.code);
                  return (
                    <tr key={table.id}>
                      <td>{table.code}</td>
                      <td>{user ? <a href={`mailto:${user.email}`}>{user.email}</a> : "No email"}</td>
                      <td>{table.event_date}</td>
                      <td>{table.type}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>

      <div className="w-[80vw] mt-24">

        <div className="flex align-center">
          <h2 className="font-semibold">Lists</h2>
          <button onClick={() => toggleTable("lists")} className="font-regular mb-4 ml-auto">
            {collapsedTables.lists ? "Show Lists" : "Hide Lists"}
          </button>
        </div>
        {!collapsedTables.lists && (
          <>
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
                  <th className="text-left">Code</th>
                  <th className="text-left">Email</th>
                  <th className="text-left">Instagram</th>
                  <th className="text-left">Event Date</th>
                  <th className="text-left">Check-In</th>
                </tr>
              </thead>
              <tbody>
                {filteredLists.map((list) => {
                  const user = usersData.find((u) => u.userCode === list.code);
                  return (
                    <tr key={list.id}>
                      <td>{list.code}</td>
                      <td>{user ? <a href={`mailto:${user.email}`}>{user.email}</a> : "No email"}</td>
                      <td>
                        {user?.instagram ? (
                          <a href={`https://instagram.com/${user.instagram}`} target="_blank">
                            {user.instagram}
                          </a>
                        ) : (
                          "No Instagram"
                        )}
                      </td>
                      <td>{list.event_date}</td>
                      <td>
                        <input
                          type="checkbox"
                          checked={list.entered}
                          onChange={(e) =>
                            toggleAttendeeStatus(
                              list.id,
                              user?.id,
                              e.target.checked,
                              list.event_date,
                              list.code
                            )
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default withAuth(Lists);
