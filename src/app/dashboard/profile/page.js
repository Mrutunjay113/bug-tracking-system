import { useToken } from "@/app/context/usercontext";
import Heading from "@/components/Heading";
import Profile from "@/components/ProfileComp";
import { getUser, getUserById } from "@/lib/actions/user/useraction";
import { verifyJwtToken } from "@/lib/utils";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    // If there's no token, redirect to the sign-in page
    // redirect("/sign-in");
  }

  let decoded;
  try {
    decoded = await verifyJwtToken(token);
  } catch (error) {
    console.error("Token verification failed:", error);
    // If token verification fails, redirect to the sign-in page
    // redirect("/sign-in");
  }

  // Proceed with fetching user data only if token is valid
  const userId = decoded?.user?._id;
  console.log(`userId`, userId);
  const { user } = await getUserById(userId);
  const data = user;
  // console.log(`data`, data);
  return (
    <main>
      <div className="flex items-center gap-2 font-bold">
        {data?.firstName}&apos;s
        <Heading headingTitle="Profile" />
      </div>

      <div className="p-6  rounded-md ">
        <Profile user={data} />
      </div>
    </main>
  );
}
