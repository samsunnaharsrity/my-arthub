const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";



// export const serverFetch = async (path) =>{
//     const res = await fetch(`${baseUrl}${path}`)

//     return res.json();
// }




export const serverMutation = async (path, data) => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const text = await res.text();

  let result;

  try {
    result = text ? JSON.parse(text) : {};
  } catch (error) {
    console.error("Invalid JSON Response:", text);

    throw new Error(
      "Server returned invalid JSON response"
    );
  }

  if (!res.ok) {
    throw new Error(
      result?.message || "Request failed"
    );
  }

  return result;
};


