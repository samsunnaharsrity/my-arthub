// import { serverFetch } from "../core/server";

// export const getSettings = async () => {
//   return await serverFetch("/api/settings");
// };


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// GET SETTINGS
export const getSettings = async () => {
  const res = await fetch(`${BASE_URL}/api/settings`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load settings");
  }

  return res.json();
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