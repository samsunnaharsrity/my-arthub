
"use server"

import { serverMutation } from "../core/server"

export  const createArtistProfile = async (newCompanyData) =>{
    return await serverMutation('/api/artistProfile', newCompanyData)
}


// const baseUrl =
//   process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:7000";

// export async function createArtistProfile(newArtistProfile) {
//   const res = await fetch(`${baseUrl}/api/artWorks`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(newArtistProfile),
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(data?.message || "Failed to create artist profile");
//   }

//   return data;
// }