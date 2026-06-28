"use client";

import { useState } from "react";
import { getSocket } from "@/lib/socket";

export default function ReplyBox({
  parentId,
  artworkId,
  user,
  onClose,
  onReplyAdded,
}) {
  const socket = getSocket();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const sendReply = async () => {
    if (!text.trim() || loading) return;

    setLoading(true);

    const payload = {
      artworkId,
      parentId,
      text,
      userId: user?._id,
      userName: user?.name,
      userAvatar: user?.avatar,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (data.success) {
        onReplyAdded?.(data.comment); // instant UI update
        socket.emit("newReply", data.comment); // realtime
        setText("");
        onClose?.();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border p-2 rounded"
        placeholder="Write a reply..."
      />

      <div className="flex gap-2 mt-2">
        <button
          onClick={sendReply}
          disabled={loading}
          className="bg-green-700 text-white px-3 py-1 rounded"
        >
          {loading ? "Sending..." : "Reply"}
        </button>

        <button onClick={onClose} className="border px-3 py-1 rounded">
          Cancel
        </button>
      </div>
    </div>
  );
}