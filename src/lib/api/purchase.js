import { serverFetch } from "../core/server";



export const getPurchaseArt = async (
  userId,
  { page = 1, limit = 6 } = {}
) => {
  return serverFetch(
    `/api/purchase?userId=${userId}&page=${page}&limit=${limit}`
  );
};