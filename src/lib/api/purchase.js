import { serverFetch } from "../core/server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;



export const getPurchaseArt = async (
  email,
  { page = 1, limit = 6 } = {}
) => {
  return serverFetch(
    `/api/purchase?buyerEmail=${email}&page=${page}&limit=${limit}`
  );
};

// user purchase delete btn
export const deleteTransaction = async (id, email) => {
  const res = await fetch(
    `${baseUrl}/api/purchase/${id}`,
    {
      method: "DELETE",
      headers: {
        "user-email": email,
      },
    }
  );

  return res.json();
};