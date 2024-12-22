"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import withAuth from "../hoc/withAuth";
import MenuAdmin from "../components/MenuAdmin";
import styles from './Dashboard.module.css';
import InvitationsTable from "../components/InvitationsTable";

function Dashboard() {
  
  return (
    <div>
      <h1 className="font-semibold text-[20px] text-center mb-6">CLEOPE Private Party Dashboard</h1>

      <InvitationsTable />
    </div>
  );
}

export default withAuth(Dashboard);