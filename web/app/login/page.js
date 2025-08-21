'use client';
import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_BASE;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      window.location.href = "/dashboard";
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{
      padding: 24,
      maxWidth: 420,
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      minHeight: "100vh"
    }}>
      <div style={{
        background: "#f5f7fa",
        padding: 32,
        borderRadius: 12,
        boxShadow: "0 2px 12px #eee",
        width: "100%",
        maxWidth: 400,
        margin: "0 auto"
      }}>
        <h2 style={{
          textAlign: "center",
          marginBottom: 24,
          color: "#0070f3",
          fontWeight: 700,
          fontSize: 28
        }}>Login</h2>
        <form onSubmit={onSubmit} style={{ display: "grid", gap: 16 }}>
          <input
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              padding: "10px 12px",
              borderRadius: 6,
              border: "1px solid #ddd",
              fontSize: 16,
              background: "#fff"
            }}
            autoFocus
            type="email"
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              padding: "10px 12px",
              borderRadius: 6,
              border: "1px solid #ddd",
              fontSize: 16,
              background: "#fff"
            }}
            autoComplete="current-password"
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px 0",
              borderRadius: 6,
              border: "none",
              background: "#0070f3",
              color: "#fff",
              fontWeight: 600,
              fontSize: 16,
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 1px 4px #eee",
              transition: "background 0.2s"
            }}
            onMouseOver={e => e.target.style.background = "#546d8bff"}
            onMouseOut={e => e.target.style.background = "#aac1dbff"}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p style={{
            color: "crimson",
            background: "#ffe0e0",
            borderRadius: 6,
            padding: "8px 12px",
            textAlign: "center",
            fontWeight: 500,
            marginTop: 4
          }}>{error}</p>}
        </form>
      </div>
    </main>
  );
}