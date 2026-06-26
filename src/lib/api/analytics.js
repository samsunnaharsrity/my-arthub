import { serverFetch } from "../core/server";

export const getCategoryAnalytics = async () => {
  
  return serverFetch("/api/analytics/categories");
};

