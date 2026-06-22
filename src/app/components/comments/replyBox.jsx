"use client";

import { useState } from "react";

export default function ReplyBox({
  parentId,
  artworkId,
  user,
  onClose,
}) {
  const [text, setText] = useState("");

  const sendReply = async () => {
    if (!text.trim()) return;

    try {
      const res = await fetch(
        "http://localhost:7000/api/comments",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            artworkId,
            parentId,
            text,
            userId: user?._id,
            userName: user?.name,
            userAvatar: user?.avatar,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setText("");
        onClose?.(); 
      }
    } catch (err) {
      console.error("Reply failed:", err);
    }
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a reply..."
        style={{
          width: "100%",
          padding: 8,
          border: "1px solid #ddd",
          borderRadius: 6,
        }}
      />

      <div
        style={{
          display: "flex",
          gap: 8,
          marginTop: 6,
        }}
      >
        <button
          onClick={sendReply}
          style={{
            background: "#047857",
            color: "#fff",
            border: "none",
            padding: "6px 12px",
            cursor: "pointer",
            borderRadius: 4,
          }}
        >
          Reply
        </button>

        <button
          onClick={() => {
            setText("");
            onClose?.(); 
          }}
          style={{
            background: "transparent",
            border: "1px solid #ccc",
            padding: "6px 12px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}