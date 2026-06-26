import { headers } from "next/headers"
import { auth } from "../auth"
import { redirect } from "next/navigation"

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
    query: { disableCookieCache: true },
  });

  if (!session?.user?.email) return null;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users?email=${session.user.email}`
  );

  const dbUser = await res.json();

  return {
    ...session.user,
    ...dbUser, 
  };
};


// GET TOKEN
export const getUserToken = async() =>{
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return session?.session?.token || null
}





export const requireRole = async (role) => {
    const user = await getUserSession();
    if (!user) {
        redirect('/login')
    }
    if (user?.role !== role) {
        return redirect('/unauthorized')
    }
    return user;
}