"use client";

import Link from "next/link";

export default function MenuAdmin() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        justifyItems: "center",
        background: "#151515b5",
        border: "1px solid #ffffff33",
        borderRadius: "1000px",
        marginTop: "20px",
        padding: "10px 20px",
        color: "#fff",
        zIndex: 1000,
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      {/* Left Links */}
      <div style={{ display: "flex", gap: "20px", justifyContent: "flex-start" }}>
        <Link href="/dashboard">
          <div style={{ color: "#fff", textDecoration: "none", cursor: "pointer", fontSize: '12px' }}>
            Dashboard
          </div>
        </Link>
        <Link href="/logout">
          <div style={{ color: "#fff", textDecoration: "none", cursor: "pointer", fontSize: '12px' }}>
            Logout
          </div>
        </Link>
      </div>

      {/* Center Logo */}
      <div style={{ textAlign: "center" }}>
        <img
          src="/logo.svg"
          alt="Logo"
          style={{
            height: "30px",
            width: "auto",
          }}
        />
      </div>

      {/* Right Links */}
      <div style={{ display: "flex", gap: "20px", justifyContent: "flex-end" }}>
        <Link href="/users">
          <div style={{ color: "#fff", textDecoration: "none", cursor: "pointer", fontSize: '12px' }}>
            Users
          </div>
        </Link>
        <Link href="/lists">
          <div style={{ color: "#fff", textDecoration: "none", cursor: "pointer", fontSize: '12px' }}>
            Lists
          </div>
        </Link>
      </div>
    </div>
  );
}
