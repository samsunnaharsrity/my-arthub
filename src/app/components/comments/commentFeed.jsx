"use client";

import { useEffect, useState } from "react";
import { getSocket } from "@/lib/socket";
import CommentThread from "./commentThread";

export default function CommentFeed({ initialComments, artworkId }) {
  const [comments, setComments] = useState(initialComments);
  const socket = getSocket();

  useEffect(() => {
    socket.emit("joinArtwork", artworkId);

    socket.on("commentAdded", (data) => {
      setComments((prev) => [data, ...prev]);
    });

    return () => {
      socket.off("commentAdded");
    };
  }, []);

  return (
    <div style={{ marginTop: "2rem" }}>
      {comments.map((c) => (
        <CommentThread key={c._id} comment={c} />
      ))}
    </div>
  );
}