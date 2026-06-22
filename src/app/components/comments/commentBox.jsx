"use client";

import { useState } from "react";
import { getSocket } from "@/lib/socket";

export default function CommentBox({ user, artworkId }) {
  const [text, setText] = useState("");
  const socket = getSocket();

  const sendComment = async () => {
    if (!text.trim()) return;

    const comment = {
      artworkId,
      text,
      userId: user._id,
      userName: user.name,
      parentId: null,
    };

    await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    });

    socket.emit("newComment", comment);

    setText("");
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
        style={{ width: "100%", padding: "10px" }}
      />

      <button className="btn-primary" onClick={sendComment}>
        Post Comment
      </button>
    </div>
  );
}