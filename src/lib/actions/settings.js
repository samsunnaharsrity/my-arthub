"use server"

import { serverMutation } from "../core/server"

export const createSettings = async (settings) => {

    return await serverMutation('/api/settings', settings)
}