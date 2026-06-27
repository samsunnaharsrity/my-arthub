"use server";

export const createArts = async (payload, email, token) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/artWorks`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "user-email": email,
      },
      body: JSON.stringify(payload),
    }
  );

  return await res.json();
};

export const updateArts = async (id, data) => {
  return await serverMutation(`/api/artWorks/${id}`, data, "PATCH");
};