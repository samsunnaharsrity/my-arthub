"use client";

import { useState } from "react";

export default function CommentFeed({ initialComments }) {
  const [comments, setComments] = useState(initialComments);

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment._id}>
          <h4>{comment.userName}</h4>
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  );
}