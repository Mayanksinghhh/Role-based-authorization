'use client';
import { useEffect, useState } from "react";
const API = process.env.NEXT_PUBLIC_API_BASE;

export default function EditorPanel() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch(`${API}/content/posts`, { credentials: "include" });
    const data = await res.json();
    setPosts(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function createPost() {
    if (!title.trim() || !body.trim()) return;
    setLoading(true);
    await fetch(`${API}/content/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ title, body })
    });
    setTitle(""); setBody(""); await load();
  }

  async function updatePost(id) {
    const post = posts.find(p => p._id === id);
    const newTitle = prompt("New title?", post?.title);
    const newBody = prompt("New body?", post?.body);
    if (newTitle && newBody) {
      setLoading(true);
      await fetch(`${API}/content/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title: newTitle, body: newBody })
      });
      await load();
    }
  }

  async function deletePost(id) {
    if (!window.confirm("Delete this post?")) return;
    setLoading(true);
    await fetch(`${API}/content/posts/${id}`, { method: "DELETE", credentials: "include" });
    await load();
  }

  return (
    <section id="content" style={{ maxWidth: 600, margin: "0 auto" }}>
      <h3 style={{ marginBottom: 16 }}>Content <span style={{ color: "#888", fontWeight: 400 }}>(Editor)</span></h3>
      <div style={{
        display: "grid",
        gap: 10,
        maxWidth: 520,
        background: "#f5f7fa",
        padding: 16,
        borderRadius: 8,
        boxShadow: "0 2px 8px #eee",
        marginBottom: 24
      }}>
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{
            padding: "8px 10px",
            borderRadius: 6,
            border: "1px solid #ddd",
            fontSize: 15
          }}
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={e => setBody(e.target.value)}
          rows={4}
          style={{
            padding: "8px 10px",
            borderRadius: 6,
            border: "1px solid #ddd",
            fontSize: 15,
            resize: "vertical"
          }}
        />
        <button
          onClick={createPost}
          disabled={loading || !title.trim() || !body.trim()}
          style={{
            padding: "8px 0",
            borderRadius: 6,
            border: "none",
            background: "#e0f7fa",
            color: "#0070f3",
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.2s"
          }}
          onMouseOver={e => e.target.style.background = "#b2ebf2"}
          onMouseOut={e => e.target.style.background = "#e0f7fa"}
        >
          {loading ? "Saving..." : "Create"}
        </button>
      </div>

      <h4 style={{ marginTop: 16, marginBottom: 12 }}>Posts</h4>
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
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={() => updatePost(p._id)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 5,
                    border: "1px solid #ddd",
                    background: "#f5faff",
                    color: "#0070f3",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "background 0.2s"
                  }}
                  onMouseOver={e => e.target.style.background = "#e0f7fa"}
                  onMouseOut={e => e.target.style.background = "#f5faff"}
                >
                  Edit
                </button>
                <button
                  onClick={() => deletePost(p._id)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 5,
                    border: "1px solid #f5c2c7",
                    background: "#fff0f0",
                    color: "crimson",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "background 0.2s"
                  }}
                  onMouseOver={e => e.target.style.background = "#ffe0e0"}
                  onMouseOut={e => e.target.style.background = "#fff0f0"}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}