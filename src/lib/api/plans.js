import { serverFetch } from "../core/server";


export const getPlanById = async (planId) => {

    console.log('this is plan id',planId);
 return serverFetch(`/api/plans?plan_id=${planId}`)
};