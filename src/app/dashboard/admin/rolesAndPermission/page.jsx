import React from "react";
import ApprovalPage from "./approvalPage";
import { getAllArtworks } from "@/lib/api/artWorks";

const RolesAndApprovalPage = async () => {
  const artworks = await getAllArtworks();

  console.log("ARTWORKS:", artworks);

  return <ApprovalPage permission={artworks} />;
};

export default RolesAndApprovalPage;