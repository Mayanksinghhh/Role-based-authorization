'use client';
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar.js";
import AdminPanel from "../../components/panels/AdminPanel.js";
import EditorPanel from "../../components/panels/EditorPanel.js";
import ViewerPanel from "../../components/panels/ViewerPanel.js";

const API = process.env.NEXT_PUBLIC_API_BASE;

export default function Dashboard() {
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/auth/me`, { credentials: "include" });
        if (res.status === 401) {
          window.location.href = "/login";
          return;
        }
        const data = await res.json();
        setMe(data);
      } catch (e) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <main style={{ padding: 24 }}>Loading...</main>;
  if (error) return <main style={{ padding: 24, color: "crimson" }}>{error}</main>;
  if (!me) return null;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar role={me.role} name={me.name} />
      <main style={{ padding: 24, flex: 1 }}>
        <h2>Welcome, {me.name} <small style={{ fontWeight: 400 }}>({me.role})</small></h2>
        {me.role === "admin" && <AdminPanel />}
        {me.role === "editor" && <EditorPanel />}
        {me.role === "viewer" && <ViewerPanel />}
      </main>
    </div>
  );
}
