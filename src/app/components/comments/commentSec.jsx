
import { getCommentsByArtwork } from "@/lib/api/comments";
import CommentBox from "./commentBox";
import CommentFeed from "./commentFeed";

export default async function CommentSection({ artworkId, user }) {
  const initialComments = await getCommentsByArtwork(artworkId);

  return (
    <div>
      {/* Write comment */}
      {user ? (
        <CommentBox user={user} artworkId={artworkId} />
      ) : (
        <p style={{ color: "#8a8377" }}>
          Login to write a comment
        </p>
      )}

      {/* Comments list */}
      <CommentFeed
        initialComments={initialComments}
        artworkId={artworkId}
        user={user}
      />
    </div>
  );
}