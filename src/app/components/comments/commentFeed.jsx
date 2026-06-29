"use client";

import { useEffect, useState } from "react";
import { getSocket } from "@/lib/socket";
import CommentThread from "./commentThread";

export default function CommentFeed({
  initialComments,
  artworkId,
  user,
}) {
  const [comments, setComments] =
    useState(initialComments);

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  // Reply insert helper
  const insertReply = (comments, reply) => {
    return comments.map((comment) => {
      if (comment._id === reply.parentId) {
        return {
          ...comment,
          replies: [
            ...(comment.replies || []),
            reply,
          ],
        };
      }

      return {
        ...comment,
        replies: insertReply(
          comment.replies || [],
          reply
        ),
      };
    });
  };


const removeComment = (comments, id) => {
  return comments
    .filter((comment) => comment._id !== id)
    .map((comment) => ({
      ...comment,
      replies: removeComment(
        comment.replies || [],
        id
      ),
    }));
};



  useEffect(() => {
    const socket = getSocket();

    socket.emit("joinArtwork", artworkId);

    // New comment
    socket.on(
      "commentAdded",
      (newComment) => {
        setComments((prev) => {
          const exists = prev.find(
            (c) => c._id === newComment._id
          );

          if (exists) return prev;

          return [newComment, ...prev];
        });
      }
    );

    // New reply
    socket.on("newReply", (reply) => {
      setComments((prev) =>
        insertReply(prev, reply)
      );
    });

    // Delete comment
socket.on(
  "commentDeleted",
  (commentId) => {
    setComments((prev) =>
      removeComment(prev, commentId)
    );
  }
);

    return () => {
      socket.off("commentAdded");
      socket.off("newReply");
      socket.off("commentDeleted");
    };
  }, [artworkId]);

  // Delete instantly from UI
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
    removeComment(prev, id)
  );
}
    } catch (error) {
      console.log(error);
    }
  };

  // Add reply instantly
  const handleReplyAdded = (reply) => {
    setComments((prev) =>
      insertReply(prev, reply)
    );
  };

  return (
    <div className="mt-8 space-y-6">
      {comments
        .filter((c) => !c.parentId)
        .map((comment) => (
          <CommentThread
            key={comment._id}
            comment={comment}
            user={user}
            onDelete={handleDelete}
            onReplyAdded={
              handleReplyAdded
            }
          />
        ))}
    </div>
  );
}