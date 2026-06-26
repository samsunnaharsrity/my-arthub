"use client";

import { useEffect, useState } from "react";
import { getSocket } from "@/lib/socket";
import CommentThread from "./commentThread";

export default function CommentFeed({
  initialComments,
  artworkId,
  user,
}) {
  const [comments, setComments] = useState(initialComments);

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  useEffect(() => {
    const socket = getSocket();

    socket.emit("joinArtwork", artworkId);

    socket.on("commentAdded", (newComment) => {
      setComments((prev) => {
        const exists = prev.find(
          (c) => c._id === newComment._id
        );

        if (exists) return prev;

        return [newComment, ...prev];
      });
    });

    socket.on("commentDeleted", (commentId) => {
      setComments((prev) =>
        prev.filter(
          (c) =>
            c._id !== commentId &&
            c.parentId !== commentId
        )
      );
    });

    return () => {
      socket.off("commentAdded");
      socket.off("commentDeleted");
    };
  }, [artworkId]);

  // delete instantly from UI
  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/comments/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.success) {
        setComments((prev) =>
          prev.filter(
            (c) =>
              c._id !== id &&
              c.parentId !== id
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // add reply/comment instantly
  const handleReplyAdded = (reply) => {
    setComments((prev) => [reply, ...prev]);
  };

  return (
    <div className="mt-8 space-y-6">
      {comments
        .filter((c) => !c.parentId)
        .map((comment) => (
          <CommentThread
            key={comment._id}
            comment={comment}
            comments={comments}
            user={user}
            onDelete={handleDelete}
            onReplyAdded={handleReplyAdded}
          />
        ))}
    </div>
  );
}