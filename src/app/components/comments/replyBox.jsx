"use client";

import { useState } from "react";

export default function ReplyBox({
  parentId,
  artworkId,
  user,
  onClose,
  onReplyAdded,
}) {
  const [text, setText] = useState("");

  const sendReply = async () => {
    if (!text.trim()) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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
        onReplyAdded?.(data.comment);

        setText("");
        onClose?.();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a reply..."
        className="w-full border rounded p-2"
      />

      <div className="flex gap-2 mt-2">
        <button
          onClick={sendReply}
          className="bg-green-700 text-white px-4 py-2 rounded"
        >
          Reply
        </button>

        <button
          onClick={() => {
            setText("");
            onClose?.();
          }}
          className="border px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}