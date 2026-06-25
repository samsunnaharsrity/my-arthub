


"use server"

import { serverMutation } from "../core/server"

export  const createArts = async (newCompanyData) =>{
    return await serverMutation('/api/artWorks', newCompanyData)
}

export  const updateArts = async (id , data) =>{
    return await serverMutation(`/api/artWorks/${id}`,data, 'PATCH' )
}

