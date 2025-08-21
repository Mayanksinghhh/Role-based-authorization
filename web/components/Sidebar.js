import { useRouter } from "next/navigation";

export default function Sidebar({ role, name }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/logout`, {
      method: "POST",
      credentials: "include"
    });
    router.push("/login");
  }

  return (
    <aside
      style={{
        width: 220,
        background: "#f5f7fa",
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        borderRight: "1px solid #eee",
        boxShadow: "0 2px 8px #eee"
      }}
    >
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontWeight: 700, fontSize: 20, color: "#0070f3" }}>{name}</div>
        <div style={{ color: "#888", fontSize: 15, marginTop: 2, fontWeight: 500 }}>{role}</div>
      </div>
      <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <a
          href="/dashboard"
          style={{
            padding: "10px 12px",
            borderRadius: 6,
            background: "#e0e7ff",
            color: "#333",
            fontWeight: 500,
            textDecoration: "none",
            transition: "background 0.2s"
          }}
          onMouseOver={e => (e.target.style.background = "#c7d2fe")}
          onMouseOut={e => (e.target.style.background = "#e0e7ff")}
        >
          Dashboard
        </a>
        {/* Add more links as needed */}
      </nav>
      <div style={{ flex: 1 }} />
      <button
        onClick={handleLogout}
        style={{
          marginTop: "auto",
          padding: "10px 0",
          width: "100%",
          borderRadius: 6,
          border: "none",
          background: "#ffe0e0",
          color: "crimson",
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 1px 4px #eee",
          transition: "background 0.2s"
        }}
        onMouseOver={e => (e.target.style.background = "#ffcccc")}
        onMouseOut={e => (e.target.style.background = "#ffe0e0")}
      >
        Logout
      </button>
    </aside>
  )
}