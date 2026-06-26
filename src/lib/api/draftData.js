import { serverFetch } from "../core/server";

export const getDrafts = async (email) => {
  return serverFetch(
    `/api/drafts?email=${email}`
  );
};