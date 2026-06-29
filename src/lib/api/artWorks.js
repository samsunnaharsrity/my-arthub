import { authClient } from "../auth-client";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getBrowseArtwork = async (category) => {
  console.log(
    "BASE URL:",
    process.env.NEXT_PUBLIC_BASE_URL
  );

  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/artWorks?status=approved`;

  console.log("FETCH URL:", url);

  const res = await fetch(url, {
    cache: "no-store",
  });

  console.log("STATUS:", res.status);

  if (!res.ok) {
    const text = await res.text();

    console.log("ERROR:", text);

    throw new Error(
      `Failed: ${res.status} ${text}`
    );
  }

  return res.json();
};


// Single artwork
export const getArtworkById = async (id) => {
  const res = await fetch(
    `${baseUrl}/api/artWorks/${id}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch artwork");
  }

  return data.data; 
};


// All artworks (Protected)
export const getArtWorks = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${baseUrl}/api/artWorks`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch artworks");
  }

  return res.json();
};




// Delete artwork

export const deleteArtwork = async (id) => {
  const session = await authClient.getSession();

  const email = session?.data?.user?.email;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/artWorks/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "user-email": email,
      },
    }
  );

  return await res.json();
};

// Edit artwork

export const editArtwork = async (id, data) => {
  const session = await authClient.getSession();

  const email = session?.data?.user?.email;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/artWorks/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "user-email": email, 
      },
      body: JSON.stringify(data),
    }
  );

  return await res.json();
};


// Draft artworks
export const getAllArtworks = async (status = "") => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/artWorks?status=${status}`,
    {
      cache: "no-store",
    }
  );

  return await res.json();
};

// Admin approval

export const approveArtwork = async (id, email) => {
  const res = await fetch(
    `${baseUrl}/api/artWorks/approve/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "user-email": email,
      },
    }
  );

  return res.json();
};

export const rejectArtwork = async (id, email) => {
  const res = await fetch(
    `${baseUrl}/api/artWorks/reject/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "user-email": email,
      },
    }
  );

  return res.json();
};



