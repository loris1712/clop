"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import styles from './Dashboard.module.css';

function DashboardPage() {
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
            userCode: doc.id,
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
            userCode: doc.id,
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

  const handleSendCard = async (email, userCode) => {
    try {
      const userCardRef = doc(db, "users_cards2", userCode);
      const userCardSnapshot = await getDoc(userCardRef);

      if (userCardSnapshot.exists()) {
        await setDoc(userCardRef, { cardStatus: "received" }, { merge: true });
      } else {
        await setDoc(userCardRef, {
          cardStatus: "received",
          userCode: email,
        });
      }

      setInvitedData(prevData => prevData.map(invited => 
        invited.userCode === userCode ? { ...invited, cardStatus: "received" } : invited
      ));
      setRequestedData(prevData => prevData.map(requested => 
        requested.userCode === userCode ? { ...requested, cardStatus: "received" } : requested
      ));

      alert(`Card sent to ${email} for userCode: ${userCode}`);
    } catch (error) {
      console.error("Error sending card:", error);
      alert("Failed to send card. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container p-6 md:mx-10 mx-4">
      <h1 className="text-2xl font-bold text-center mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Summary Cards */}
        <div className="bg-dark shadow rounded-lg">
          <h2 className="text-lg font-semibold">Summary</h2>
          <p className="text-gray-600">Invited: {invitedData.length}</p>
          <p className="text-gray-600">Requested: {requestedData.length}</p>
        </div>

        {/* Chart Placeholder */}
        <div className="bg-dark shadow rounded-lg">
          <h2 className="text-lg font-semibold">Event Insights</h2>
          <p className="text-gray-600">Charts and graphs coming soon!</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Invited Guests</h2>
        <div className="overflow-auto">
          <table className="table-auto w-full border border-gray-300">
            <thead>
              <tr className="bg-dark-100">
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Card Status</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {invitedData.map((invited) => (
                <tr key={invited.id} className="hover:bg-blue-500">
                  <td className="border px-4 py-2">{invited.email}</td>
                  <td className="border px-4 py-2">{invited.cardStatus || "Not Sent"}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleSendCard(invited.email, invited.userCode)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
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

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Requested Invitations</h2>
        <div className="overflow-auto">
          <table className="table-auto w-full border border-gray-300">
            <thead>
              <tr className="bg-dark-100">
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">First Name</th>
                <th className="px-4 py-2 text-left">Last Name</th>
                <th className="px-4 py-2 text-left">Card Status</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {requestedData.map((requested) => (
                <tr key={requested.id} className="hover:bg-blue-500">
                  <td className="border px-4 py-2">{requested.email}</td>
                  <td className="border px-4 py-2">{requested.firstName}</td>
                  <td className="border px-4 py-2">{requested.lastName}</td>
                  <td className="border px-4 py-2">{requested.cardStatus || "Not Sent"}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleSendCard(requested.email, requested.userCode)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
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

      <footer className="mt-12 text-center text-gray-500">
        © 2024 CLEOPE Event Management
      </footer>
    </div>
  );
}

export default DashboardPage;
