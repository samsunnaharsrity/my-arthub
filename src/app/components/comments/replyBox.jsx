"use client";

import { useState } from "react";
import { getSocket } from "@/lib/socket";

export default function ReplyBox({ parentId, artworkId, user }) {
  const [text, setText] = useState("");
  const socket = getSocket();

  const sendReply = async () => {
    if (!text.trim()) return;

    const reply = {
      artworkId,
      parentId, // 👈 IMPORTANT (thread connection)
      text,
      userId: user?._id,
      userName: user?.name,
      userAvatar: user?.avatar || "",
    };

    try {
      await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reply),
      });

      // 🔥 real-time update
      socket.emit("newComment", reply);

      setText("");
    } catch (err) {
      console.error("Reply failed:", err);
    }
  };

  return (
    <div style={{ marginTop: "8px" }}>
      
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a reply..."
        style={{
          width: "100%",
          padding: "8px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          fontSize: "0.9rem",
        }}
      />

      <div style={{ marginTop: "6px", display: "flex", gap: "8px" }}>
        <button
          onClick={sendReply}
          className="btn-primary"
          style={{ height: "36px", fontSize: "0.8rem" }}
        >
          Reply
        </button>

        <button
          onClick={() => setText("")}
          style={{
            height: "36px",
            fontSize: "0.8rem",
            background: "transparent",
            border: "1px solid #ccc",
            padding: "0 10px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}