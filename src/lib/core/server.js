import { getUserSession, getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:7000";


export const authHeader = async () =>{
  const token = await getUserToken();
  const header = {
    authorization: `Bearer ${token}`
  }

  return token? header : {};
}



export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`, {
    cache: "no-store",
  });

  const text = await res.text();

  let result;

  try {
    result = text ? JSON.parse(text) : {};
  } catch (error) {
    console.error(
      `[serverFetch] Invalid JSON response from ${path}:`,
      text.slice(0, 200)
    );
    throw new Error(
      `Server returned invalid JSON response (status ${res.status}) for ${path}`
    );
  }

  if (!res.ok) {
    throw new Error(result?.message || `Request failed with status ${res.status}`);
  }

  return result;
};


// protected data 
 export const protectedDataFetch = async(path) =>{
  const res = await fetch(`${baseUrl}${path}`,
    {
      headers: await authHeader()
    }
  )


  return res.json()
 }



//  serverMutation


export const serverMutation = async (
  path,
  data,
  method = "POST"
) => {
  const token = await getUserToken();
  const user = await getUserSession();

  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
      "user-email": user?.email,
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
  return {
    success: false,
    message: result?.message,
  };
}

  return result;
};


