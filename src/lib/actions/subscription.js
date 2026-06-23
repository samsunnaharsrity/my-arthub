"use server"

import { serverMutation } from "../core/server"

export const createSubscription = async (subscriptionInfo) => {
    console.log("🚀 createSubscription called:", subscriptionInfo);

    return await serverMutation('/api/subscriptions', subscriptionInfo)
}