// "use server"

// import { serverMutation } from "../core/server"

// export  const createPurchase = async (newPurchaseData) =>{
//     return await serverMutation('/api/purchase', newPurchaseData)
// }


export const createPurchase = async (
  purchaseData
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/purchase`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "user-email":
            purchaseData.buyerEmail,
        },
        body: JSON.stringify(
          purchaseData
        ),
      }
    );

    const data = await res.json();

    return {
      success: res.ok,
      ...data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};