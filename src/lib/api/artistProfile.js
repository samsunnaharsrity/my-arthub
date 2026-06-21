import { serverFetch } from "../core/server";
import { getUserSession } from "../core/session";


export const getArtistProfile = async (userId) => {

  return serverFetch(`/api/artistProfile?userId=${userId}`);
}

export const getLoggedInArtistData = async () =>{
  const user = await getUserSession();
  return getArtistProfile(user?.id);
}