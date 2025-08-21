'use client';
import { useEffect, useState } from "react";
const API = process.env.NEXT_PUBLIC_API_BASE;

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingLogs, setLoadingLogs] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);

  async function loadUsers() {
    setLoadingUsers(true);
    const res = await fetch(`${API}/users`, { credentials: "include" });
    const data = await res.json();
    setUsers(Array.isArray(data) ? data : []);
    setLoadingUsers(false);
  }

  async function loadLogs() {
    setLoadingLogs(true);
    const res = await fetch(`${API}/logs`, { credentials: "include" });
    const data = await res.json();
    setLogs(Array.isArray(data) ? data : []);
    setLoadingLogs(false);
  }

  async function loadPosts() {
    setLoadingPosts(true);
    const res = await fetch(`${API}/content/posts`, { credentials: "include" });
    const data = await res.json();
    setPosts(Array.isArray(data) ? data : []);
    setLoadingPosts(false);
  }

  useEffect(() => { loadUsers(); loadLogs(); loadPosts(); }, []);

  async function changeRole(id, role) {
    await fetch(`${API}/users/${id}/role`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ role })
    });
    await loadUsers();
  }

  async function deleteUser(id) {
    await fetch(`${API}/users/${id}`, { method: "DELETE", credentials: "include" });
    await loadUsers();
  }

  return (
    <section>
      <h3 id="users" style={{ marginBottom: 12 }}>Manage Users</h3>
      {loadingUsers ? <p>Loading users...</p> : (
        <table
          border="0"
          cellPadding="8"
          style={{
            borderCollapse: "collapse",
            width: "100%",
            boxShadow: "0 2px 8px #eee",
            fontSize: 15,
            marginBottom: 24
          }}
        >
          <thead style={{ background: "#f5f5f5" }}>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u._id} style={{ background: i % 2 ? "#fafafa" : "#fff" }}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <span style={{
                    padding: "2px 8px",
                    borderRadius: 6,
                    background: u.role === "admin" ? "#ffe0e0" : u.role === "editor" ? "#e0f7fa" : "#e0e0ff",
                    color: "#333",
                    fontWeight: 500
                  }}>{u.role}</span>
                </td>
                <td style={{ display: "flex", gap: 8 }}>
                  {["admin", "editor", "viewer"].map(r => (
                    <button
                      key={r}
                      disabled={u.role === r}
                      onClick={() => changeRole(u._id, r)}
                      style={{
                        padding: "4px 10px",
                        borderRadius: 5,
                        border: "1px solid #ddd",
                        background: u.role === r ? "#eee" : "#f5faff",
                        color: u.role === r ? "#aaa" : "#0070f3",
                        cursor: u.role === r ? "not-allowed" : "pointer",
                        transition: "background 0.2s"
                      }}
                      onMouseOver={e => { if (u.role !== r) e.target.style.background = "#e0f7fa"; }}
                      onMouseOut={e => { if (u.role !== r) e.target.style.background = "#f5faff"; }}
                    >
                      {r}
                    </button>
                  ))}
                  <button
                    onClick={() => deleteUser(u._id)}
                    style={{
                      padding: "4px 10px",
                      borderRadius: 5,
                      border: "1px solid #f5c2c7",
                      background: "#fff0f0",
                      color: "crimson",
                      cursor: "pointer",
                      transition: "background 0.2s"
                    }}
                    onMouseOver={e => e.target.style.background = "#ffe0e0"}
                    onMouseOut={e => e.target.style.background = "#fff0f0"}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3 id="posts" style={{ marginTop: 24, marginBottom: 12 }}>All Posts</h3>
      <div style={{
        maxWidth: 600,
        background: "#f5f7fa",
        padding: 16,
        borderRadius: 8,
        boxShadow: "0 2px 8px #eee",
        marginBottom: 24
      }}>
        {loadingPosts ? <p>Loading posts...</p> : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {posts.map(p => (
              <li key={p._id} style={{
                marginBottom: 16,
                background: "#fff",
                borderRadius: 8,
                boxShadow: "0 1px 4px #eee",
                padding: 12,
                border: "1px solid #f0f0f0"
              }}>
                <strong style={{ fontSize: 16 }}>{p.title}</strong>
                <p style={{ margin: "8px 0", color: "#444" }}>{p.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <h3 id="logs" style={{ marginTop: 24, marginBottom: 12 }}>System Logs (latest 200)</h3>
      {loadingLogs ? <p>Loading logs...</p> : (
        <div style={{
          maxHeight: 300,
          overflow: "auto",
          border: "1px solid #eee",
          padding: 8,
          background: "#fafbfc",
          fontSize: 14,
          borderRadius: 6
        }}>
          {logs.map(l => (
            <div key={l._id} style={{
              padding: "4px 0",
              borderBottom: "1px solid #f0f0f0"
            }}>
              <code style={{ color: "#555" }}>
                <span style={{ color: "#888" }}>{new Date(l.createdAt).toLocaleString()}</span>
                {" — "}
                <span style={{ color: "#0070f3" }}>{l.email || l.userId}</span>
                {" — "}
                <span style={{ color: "#333" }}>{l.action}</span>
                {" — "}
                <span style={{ color: "#888" }}>{l.route}</span>
              </code>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}