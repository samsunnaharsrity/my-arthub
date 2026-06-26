import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const getBrowseArtwork = async (category) => {
  let url = "/api/artWorks?status=approved";

  if (category && category !== "All") {
    url += `&category=${encodeURIComponent(category)}`;
  }

  return serverFetch(url);
};

export const getArtworkById = async (id) => {
 return serverFetch(`/api/artworks/${id}`)
};

export const getArtWorks = async () => {
  const res = await fetch(`${baseUrl}/api/artWorks`, {
    cache: "no-store",
  });

  return res.json();
};


// delete btn
export const deleteArtwork = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/artworks/${id}`,
    {
      method: "DELETE",
    }
  );

  return await res.json();
};


// edit btn


export const editArtwork = async (id, data) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/artWorks/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return res.json();
};

// get admin approval

export const getApproval = async() =>{
  return serverFetch(`/api/artWorks`)
}