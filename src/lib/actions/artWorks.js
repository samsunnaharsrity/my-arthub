
// import { serverMutation } from "../core/server"

// export const createJob = async (newJobData) =>{
//   return serverMutation('/api/jobs' , newJobData)
// }



const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:7000";

export async function createArts(newArtWorksData) {
  const res = await fetch(`${baseUrl}/api/artWorks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newArtWorksData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Failed to create artwork");
  }

  return data;
}