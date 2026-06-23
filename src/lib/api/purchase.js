import { serverFetch } from "../core/server";
// import { getUserSession } from "../core/session";


export const getPurchaseArt = async (userId ) => {

  return serverFetch(`/api/purchase?userId=${userId}`);
}

// export const getLoggedInArtistData = async () =>{
//   const user = await getUserSession();
//   return getArtistProfile(user?.id);
// }