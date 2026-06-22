"use client";

import { useState } from "react";
import LikeButton from "./likeBtn";
import ReplyBox from "./replyBox";

export default function CommentThread({ comment }) {
  const [showReply, setShowReply] = useState(false);

  return (
    <div style={{ marginBottom: "1rem", paddingLeft: "10px" }}>
      
      <div>
        <strong>{comment.userName}</strong>
        <p>{comment.text}</p>

        <div style={{ display: "flex", gap: "10px" }}>
          <LikeButton comment={comment} />

          <button onClick={() => setShowReply(!showReply)}>
            Reply
          </button>
        </div>
      </div>

      {showReply && (
        <ReplyBox parentId={comment._id} artworkId={comment.artworkId} />
      )}

      {/* replies (if already nested from backend) */}
      <div style={{ marginLeft: "20px" }}>
        {comment.replies?.map((r) => (
          <CommentThread key={r._id} comment={r} />
        ))}
      </div>
    </div>
  );
}