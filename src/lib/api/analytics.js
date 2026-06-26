export const getCategoryAnalytics = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/analytics/categories`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch category analytics");
    }

    return await res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getSalesAnalytics = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/analytics/sales`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch sales analytics");
    }

    return await res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};