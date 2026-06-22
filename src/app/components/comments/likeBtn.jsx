"use client";

import { getSocket } from "@/lib/socket";

export default function LikeButton({ comment }) {
  const socket = getSocket();

  const like = async () => {
    const res = await fetch("http://localhost:7000/api/comments/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        commentId: comment._id,
        userId: "currentUserId",
      }),
    });

    const data = await res.json();

    socket.emit("likeComment", {
      commentId: comment._id,
      likes: data.likes,
    });
  };

  return (
    <button onClick={like}>
      ❤️ {comment.likes?.length || 0}
    </button>
  );
}