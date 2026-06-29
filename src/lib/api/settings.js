// import { serverFetch } from "../core/server";

// export const getSettings = async () => {
//   return await serverFetch("/api/settings");
// };


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// GET SETTINGS
import { serverFetch } from "../core/server";

export const getSettings = async () => {
  return await serverFetch("/api/settings");
};


// UPDATE SETTINGS
export const createSettings = async (data) => {
  const res = await fetch(`${BASE_URL}/api/settings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update settings");
  }

  return res.json();
};