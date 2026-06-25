import { serverFetch } from "../core/server";

export const getSettings = async () => {
  return await serverFetch("/api/settings");
};