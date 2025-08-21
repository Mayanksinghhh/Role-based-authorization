'use client';
import { useEffect, useState } from "react";
const API = process.env.NEXT_PUBLIC_API_BASE;

export default function ViewerPanel() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch(`${API}/content/posts`, { credentials: "include" });
    const data = await res.json();
    setPosts(Array.isArray(data) ? data : []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  return (
    <section id="content" style={{ maxWidth: 600, margin: "0 auto" }}>
      <h3 style={{ marginBottom: 16 }}>
        Posts <span style={{ color: "#888", fontWeight: 400 }}>(Read-Only)</span>
      </h3>
      <div style={{
        maxWidth: 520,
        background: "#f5f7fa",
        padding: 16,
        borderRadius: 8,
        boxShadow: "0 2px 8px #eee",
        marginBottom: 24
      }}>
        {loading ? <p>Loading posts...</p> : (
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
    </section>
  );
}