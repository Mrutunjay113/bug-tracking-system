import { useToken } from "@/app/context/usercontext";
import Heading from "@/components/Heading";
import Profile from "@/components/ProfileComp";
import { getUser, getUserById } from "@/lib/actions/user/useraction";
import { verifyJwtToken } from "@/lib/utils";
import { image } from "@nextui-org/react";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  // if (!token) {
  //   // If there's no token, redirect to the sign-in page
  //   // redirect("/sign-in");
  // }

  // let decoded;
  // try {
  //   // decoded = await verifyJwtToken(token);
  // } catch (error) {
  //   console.error("Token verification failed:", error);
  //   // If token verification fails, redirect to the sign-in page
  //   // redirect("/sign-in");
  // }

  // Proceed with fetching user data only if token is valid
  // const userId = decoded?.user?._id;
  // console.log(`userId`, userId);
  // const { user } = await getUserById(userId);
  const user = {
    _id: {
      $oid: "6698d025b122ebababc55cc6",
    },
    username: "mrutunjay12",
    email: "myemail@gmail.com",
    password: "$2b$10$q6Fpc7O5xaEjE8.8dKnqbeYKhY.o28JyEosMCFvqmTtreH18ZTH9i",
    roles: ["manager"],
    isActive: true,
    verification: {
      verified: false,
    },
    createdAt: {
      $date: "2024-07-18T08:19:49.216Z",
    },
    updatedAt: {
      $date: "2024-07-18T08:19:49.216Z",
    },
    __v: 0,
    firstName: "Mrutunjay",
    lastName: "Yadav",
    status: "active",
    // image: "https://res.cloudinary.com/dkeihjsml/image/upload/v1720689481/bxyqdqtebixpsxu8vo6n.jpg",
    image: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/4.png",
    designation: "Developer",
  };
  const data = user;
  // console.log(`data`, data);
  return (
    <main>
      <div className="flex items-center gap-2 font-bold  margin-5 py-10 md:mb-10">
        <Heading
          headingTitle={`${data?.firstName}'s Profile`}
          size="lg"
          className="uppercase ml-10"
        />
      </div>

      <div className="p-6  rounded-md ">
        <Profile user={data} />
      </div>
    </main>
  );
}
