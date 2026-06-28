import { protectedDataFetch, serverFetch } from "../core/server";
import { getUserSession } from "../core/session";


export const getArtistProfile = async (
  email
) => {
  return serverFetch(
    `/api/artistProfile?email=${email}`
  );
};

export const getLoggedInArtistData = async () => {
  const user = await getUserSession();

  if (!user?.id) {
    return null;
  }

  return await getArtistProfile(user.id);
};


// All artists

export const getAllArtistProfiles = async ({
  page = 1,
  limit = 6,
} = {}) => {
  return serverFetch(
    `/api/artistProfile/all?page=${page}&limit=${limit}`
  );
};


export const getArtistById = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/artist/${id}`);
  return res.json();
};




export const getArtworksByArtist = async (artistId) => {
  return protectedDataFetch(
    `/api/artWorks?artistId=${artistId}`
  );
};