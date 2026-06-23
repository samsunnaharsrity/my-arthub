import Image from "next/image";
import { getUserSession } from "@/lib/core/session";
import EditProfileModal from "@/components/EditProfileModal";

export default async function ProfilePage() {
  const user = await getUserSession();

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 flex justify-center">
      <ProfileClient user={user} />
    </div>
  );
}