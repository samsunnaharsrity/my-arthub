import { authClient } from "../auth-client";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getBrowseArtwork = async (category) => {
  let url = `${baseUrl}/api/artWorks?status=approved&_t=${Date.now()}`;

  if (category && category !== "All") {
    url += `&category=${encodeURIComponent(category)}`;
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // 🔥 ক্যাশ বন্ধ করার সঠিক এবং নিরাপদ নিয়ম
    cache: "no-store", 
    next: { 
      revalidate: 0 // এখানে কোনো ফাংশন বসানো যাবে না, শুধু ০ থাকবে
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch artworks");
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



