import { getMemberById } from "@/lib/actions/team/member/action";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import Image from "next/image";
import { Avatar } from "@nextui-org/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { BookA, BookOpen, Hotel, Mail, Phone } from "lucide-react";
import Heading from "@/components/Heading";

const MemberDetails = ({ member, team }) => {
  const {
    userID,
    firstName,
    lastName,
    email,
    phoneNumber,
    designation,
    profileImg,
    skills,
    availabilityStatus,
  } = member;
  const { name, description } = team || {};
  console.log(`profileImg`, team);

  return (
    <div className="p-6 bg-white border rounded-lg max-w-3xl mx-auto">
      <div className="flex items-center mb-4">
        <Avatar
          // src={profileImg}
          src="https://d2u8k2ocievbld.cloudfront.net/memojis/male/4.png"
          alt={`${firstName} ${lastName}`}
          className="w-16 h-16 mr-4"
        />
        <div>
          <h2 className="text-2xl font-bold mb-1">{`${firstName} ${lastName}`}</h2>
          <p className="text-lg text-gray-600">{designation}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Contact Information</h3>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-2">
            <Mail className="text-gray-500 mr-2" />
            <span>{email}</span>
          </div>
          <div className="flex items-center mb-2">
            <Phone className="text-gray-500 mr-2" />
            <span>{phoneNumber}</span>
          </div>
          <div className="flex items-center mb-2">
            <Hotel className="text-gray-500 mr-2" />
            <span>{designation}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <h3 className="text-xl font-semibold">Skills & Availability</h3>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-2">
            <BookA className="text-gray-500 mr-2" />
            <span>Skills: {skills.join(", ")}</span>
          </div>
          <div className="flex items-center mb-2">
            <BookOpen className="text-gray-500 mr-2" />
            <span>Status: {availabilityStatus}</span>
          </div>
        </CardContent>
      </Card>

      {team && (
        <Card className="mt-4">
          <CardHeader>
            <h3 className="text-xl font-semibold">Team Information</h3>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-2">
              <h4 className="text-lg font-bold mb-1">Name:</h4>
              <p>{team.name}</p>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <h4 className="text-lg font-bold mb-1">Description:</h4>
              <p>{team.description}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <CardFooter className="mt-4 text-gray-600">
        {/* <span>Last updated on {new Date(updatedAt).toLocaleDateString()}</span> */}
      </CardFooter>
    </div>
  );
};
export default async function Page({ params }) {
  const { id } = params;
  const { data } = await getMemberById(id);
  const member = data?.member || {};
  const teams = data.team;

  return (
    <main>
      <div className="flex items-center border-b border-gray-400 gap-2 font-bold  margin-5 py-10 md:mb-10">
        <Heading
          headingTitle={`${member?.firstName} ${member?.lastName}'s Profile`}
          size="lg"
          className="uppercase md:ml-10 ml-4 tracking-wide"
        />
      </div>
      <MemberDetails member={member} team={teams} />
    </main>
  );
}
