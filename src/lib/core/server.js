const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

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

export const serverMutation = async (path, data , method ='POST') => {
  const url = `${baseUrl}${path}`;

  try {
    const res = await fetch(url, {
      method: method ,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const text = await res.text();
    const result = text ? JSON.parse(text) : {};

    if (!res.ok) {
      throw new Error(result?.message || `Request failed ${res.status}`);
    }

    return result;
  } catch (err) {
    console.error("Fetch error:", url, err.message);
    throw err;
  }
};