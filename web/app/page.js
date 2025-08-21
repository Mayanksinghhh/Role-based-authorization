"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main style={{
      padding: 24,
      maxWidth: 600,
      margin: "0 auto",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }}>
      <div style={{
        background: "#f5f7fa",
        padding: 32,
        borderRadius: 12,
        boxShadow: "0 2px 12px #eee",
        marginBottom: 32
      }}>
        <h1 style={{
          textAlign: "center",
          color: "#0070f3",
          fontWeight: 700,
          fontSize: 32,
          marginBottom: 12
        }}>Role-Based Dashboard</h1>
        <p style={{ textAlign: "center", color: "#444", marginBottom: 18 }}>
          Demo of role-based UI with Next.js + Express.
        </p>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Link href="/login" style={{
            display: "inline-block",
            padding: "12px 32px",
            borderRadius: 6,
            background: "#0070f3",
            color: "#fff",
            fontWeight: 600,
            fontSize: 18,
            textDecoration: "none",
            boxShadow: "0 1px 4px #eee",
            transition: "background 0.2s"
          }}
            onMouseOver={e => e.target.style.background = "#393d42ff"}
            onMouseOut={e => e.target.style.background = "#4b5055ff"}
          >
            Login
          </Link>
        </div>
        <div style={{
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 1px 4px #eee",
          padding: 18,
          marginBottom: 18
        }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>List of roles and credentials:</div>
          <ul style={{ paddingLeft: 18, marginBottom: 0 }}>
            <li><b>Admin</b>:<br />Email: <span style={{ color: "#0070f3" }}>admin@example.com</span><br />Password: <span style={{ color: "#0070f3" }}>admin123</span></li>
            <li><b>Editor</b>:<br />Email: <span style={{ color: "#0070f3" }}>editor@example.com</span><br />Password: <span style={{ color: "#0070f3" }}>editor123</span></li>
            <li><b>Viewer</b>:<br />Email: <span style={{ color: "#0070f3" }}>viewer@example.com</span><br />Password: <span style={{ color: "#0070f3" }}>viewer123</span></li>
          </ul>
        </div>
        <div style={{
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 1px 4px #eee",
          padding: 18,
          marginBottom: 18
        }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>DISCLAIMER</div>
          <p style={{ marginBottom: 0 }}>
            Run this command first to register with all the above different credentials:
            <br />
            <code style={{
              background: "#f0f0f0",
              padding: "2px 8px",
              borderRadius: 4,
              fontSize: 15,
              margin: "4px 0",
              display: "inline-block"
            }}>npm install --workspaces</code>
            <br />
            <code style={{
              background: "#f0f0f0",
              padding: "2px 8px",
              borderRadius: 4,
              fontSize: 15,
              margin: "4px 0",
              display: "inline-block"
            }}>cd api and npm run seed  (to generate dummy users mentioned above) </code>
          </p>
        </div>
        <div style={{
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 1px 4px #eee",
          padding: 18
        }}>
          <h2 style={{ fontWeight: 700, fontSize: 22, marginBottom: 10 }}>Description</h2>
          <ul style={{ paddingLeft: 18, marginBottom: 0 }}>
            <li>This is an illustrative example of role-based authorization.</li>
            <li>Users are assigned a role: <b>admin</b>, <b>editor</b>, or <b>viewer</b>.</li>
            <li><b>Admin</b> can update user's role, see posts and delete users.</li>
            <li><b>Editor</b> can create and edit posts can delete them.</li>
            <li><b>Viewer</b> can only view posts.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}