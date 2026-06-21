"use server"

import { serverMutation } from "../core/server"

export  const createPurchase = async (newPurchaseData) =>{
    return await serverMutation('/api/purchase', newPurchaseData)
}