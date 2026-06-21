import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getBrowseArtwork = async () =>{
    return serverFetch('/api/artWorks')
}

export const getArtworkById = async (id) => {
 return serverFetch(`/api/artworks/${id}`)
};

export const getArtWorks = async () => {
  const res = await fetch(`${baseUrl}/api/artWorks`, {
    cache: "no-store",
  });

  return res.json();
};

