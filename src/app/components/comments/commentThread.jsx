"use client";

import { useState } from "react";
import LikeButton from "./likeBtn";
import ReplyBox from "./replyBox";
import { MessageCircle } from "lucide-react";

function getInitials(name = "") {
  if (typeof name !== "string" || !name.trim()) return "?";

  return name
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

function timeAgo(date) {
  if (!date) return "";
  const now = new Date();
  const then = new Date(date);
  const seconds = Math.floor((now - then) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  return then.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const avatarPalette = [
  "#047857",
  "#0e7490",
  "#7c3aed",
  "#b45309",
  "#be123c",
  "#4338ca",
];

function avatarColor(name = "") {
  const code = name.split("").reduce((s, c) => s + c.charCodeAt(0), 0);
  return avatarPalette[code % avatarPalette.length];
}

export default function CommentThread({ comment, user }) {
  const [showReply, setShowReply] = useState(false);

  const initials = getInitials(comment?.userName);
  const bg = avatarColor(comment?.userName);

  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ display: "flex", gap: "10px" }}>
        {/* Avatar */}
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: comment.userImage ? "transparent" : bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 700,
            fontSize: "0.8rem",
            overflow: "hidden",
          }}
        >
          {comment.userImage ? (
            <img
              src={comment.userImage}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            initials || "?"
          )}
        </div>

        {/* Body */}
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
            <strong style={{ fontSize: "0.85rem" }}>
              {comment.userName || "Anonymous"}
            </strong>
            <span style={{ fontSize: "0.75rem", color: "#999" }}>
              {timeAgo(comment.createdAt)}
            </span>
          </div>

          <p style={{ margin: "4px 0", fontSize: "0.9rem" }}>
            {comment.text}
          </p>

          <div style={{ display: "flex", gap: 12 }}>
            <LikeButton comment={comment} />

            <button
              onClick={() => setShowReply(!showReply)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "0.8rem",
                color: showReply ? "green" : "#666",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <MessageCircle size={13} />
              Reply
            </button>
          </div>

          {/* Reply Box */}
          {showReply && (
            <div style={{ marginTop: 10, marginLeft: 45 }}>
              <ReplyBox
                parentId={comment._id}
                artworkId={comment.artworkId}
                user={user}
                onClose={() => setShowReply(false)}
              />
            </div>
          )}

          {/* Replies */}
          {comment.replies?.length > 0 && (
            <div
              style={{
                marginTop: 12,
                marginLeft: 20,
                borderLeft: "1px solid #eee",
                paddingLeft: 15,
              }}
            >
              {comment.replies.map((reply) => (
                <CommentThread
                  key={reply._id}
                  comment={reply}
                  user={user}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}