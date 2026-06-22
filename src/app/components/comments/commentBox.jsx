"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CommentBox({ artworkId, user }) {
  const [text, setText] = useState("");
  const router = useRouter();

  const sendComment = async () => {
    const res = await fetch("http://localhost:7000/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        artworkId,
        text,
        userId: user?._id,
        userName: user?.name,
      }),
    });

    if (res.ok) {
      setText("");
      router.refresh();
    }
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