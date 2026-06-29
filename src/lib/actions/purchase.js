// "use server"

// import { serverMutation } from "../core/server"

// export  const createPurchase = async (newPurchaseData) =>{
//     return await serverMutation('/api/purchase', newPurchaseData)
// }


export const createPurchase = async (purchaseData) => {
  const session = await authClient.getSession();

  const email = session?.data?.user?.email;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/purchase`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "user-email": email,
      },
      body: JSON.stringify(purchaseData),
    }
  );

  return await res.json();
};