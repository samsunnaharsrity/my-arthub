const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Browse page (Client Component থেকেও ব্যবহার করা যাবে)
export const getBrowseArtwork = async (category) => {
  let url = `${baseUrl}/api/artWorks?status=approved`;

  if (category && category !== "All") {
    url += `&category=${encodeURIComponent(category)}`;
  }

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch artworks");
  }

  return res.json();
};

// Single artwork
export const getArtworkById = async (id) => {
  const res = await fetch(`${baseUrl}/api/artworks/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Artwork not found");
  }

  return res.json();
};

// All artworks (Protected)
export const getArtWorks = async () => {
  const res = await fetch(`${baseUrl}/api/artWorks`, {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch artworks");
  }

  return res.json();
};

// Delete artwork
export const deleteArtwork = async (id) => {
  const res = await fetch(`${baseUrl}/api/artworks/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  return res.json();
};

// Edit artwork
export const editArtwork = async (id, data) => {
  const res = await fetch(`${baseUrl}/api/artWorks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  return res.json();
};

// Admin approval
export const getApproval = async () => {
  const res = await fetch(`${baseUrl}/api/artWorks`, {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch approvals");
  }

  return res.json();
};