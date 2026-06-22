"use server"

import { serverMutation } from "../core/server"

export  const createSubscription = async (subscriptionInfo) =>{
    return await serverMutation('/api/subscriptions', subscriptionInfo)
}