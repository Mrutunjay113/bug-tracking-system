import Heading from "@/components/Heading";
import Profile from "@/components/ProfileComp";
import { getUser, getUserById } from "@/lib/actions/user/useraction";

export default async function Page() {
  const id = "6698d025b122ebababc55cc6";
  const { user } = await getUserById(id);
  const data = user;
  console.log(`data`, data);
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
