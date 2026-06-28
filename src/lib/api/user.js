import { authClient } from "../auth-client";


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// GET USER
export const getUserByEmail = async (email) => {
  const res = await fetch(`${baseUrl}/api/users/${email}`);
  return res.json();
};

// UPDATE USER PROFILE


export const updateUserProfile = async (data) => {
  const session = await authClient.getSession();

  const email = session?.data?.user?.email;

  const res = await fetch(`${baseUrl}/api/user/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "user-email": email,
    },
    body: JSON.stringify({
      name: data.name,
      image: data.image,
    }),
  });

  return res.json();
};