// import { serverFetch } from "../core/server";

// export const getSettings = async () => {
//   return await serverFetch("/api/settings");
// };

import { serverFetch } from "../core/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// GET SETTINGS

export const getSettings = async () => {
  try {
    return await serverFetch("/api/settings");
  } catch (error) {
    console.log("SETTINGS ERROR:", error);

    return {
      siteName: "ArtHub",
      contactEmail: "admin@arthub.com",
      currency: "USD",
      maintenanceMode: false,
      autoApproveArtwork: false,
    };
  }
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