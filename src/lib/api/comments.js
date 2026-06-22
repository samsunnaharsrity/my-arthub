import { serverFetch } from "../core/server";
// import { getUserSession } from "../core/session";


export const getCommentsByArtwork = async (userId) => {

  return serverFetch(`/api/comments?userId=${userId}`);
}