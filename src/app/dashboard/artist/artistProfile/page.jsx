import React from "react";
import ArtistProfile from "./artistProfile";

import { getUserSession } from "@/lib/core/session";

import { getArtistProfile } from "@/lib/api/artistProfile";

const ArtistProfilePage = async () => {
  const user = await getUserSession();

  const artistProfile =
    await getArtistProfile(user?.email);

  return (
    <ArtistProfile
      user={user}
      artistProfile={artistProfile}
    />
  );
};

export default ArtistProfilePage;