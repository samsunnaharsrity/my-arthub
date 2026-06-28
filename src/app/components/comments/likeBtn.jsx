"use client";

import { useEffect, useState } from "react";
import { getSocket } from "@/lib/socket";

export default function LikeButton({ comment, currentUserId }) {
  const socket = getSocket();

  const [likes, setLikes] = useState(comment.likes || []);
  const [loading, setLoading] = useState(false);

  const isLiked = likes.includes(String(currentUserId));

  // sync from parent
  useEffect(() => {
    setLikes(comment.likes || []);
  }, [comment.likes]);

  // realtime socket sync
  useEffect(() => {
    const handleLikeUpdate = ({ commentId, likes }) => {
      if (commentId === comment._id) {
        setLikes(likes);
      }
    };

    socket.on("likeComment", handleLikeUpdate);

    return () => {
      socket.off("likeComment", handleLikeUpdate);
    };
  }, [socket, comment._id]);

  const toggleLike = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const payload = {
        commentId: String(comment._id),
        userId: String(currentUserId),
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/comments/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (data.success) {
        setLikes(data.likes);

        socket.emit("likeComment", {
          commentId: comment._id,
          likes: data.likes,
        });
      } else {
        console.log("LIKE FAILED:", data);
      }
    } catch (err) {
      console.log("LIKE ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleLike}
      disabled={loading}
      className={`flex items-center gap-2 px-3 py-1 rounded-full transition ${
        isLiked ? "text-red-500" : "text-gray-500"
      }`}
    >
      ❤️ <span>{likes.length}</span>
    </button>
  );
}