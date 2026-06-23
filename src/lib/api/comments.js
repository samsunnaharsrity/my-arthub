import { serverFetch } from "../core/server";
// import { getUserSession } from "../core/session";


export const getCommentsByArtwork = async (artworkId) => {

  return serverFetch(`/api/comments?artworkId=${artworkId}`);
}




export const getUserCommentsCount = async (userId) => {
  return serverFetch(`/api/comments/user/${userId}`);
};