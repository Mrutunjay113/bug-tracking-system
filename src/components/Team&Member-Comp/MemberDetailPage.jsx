import { Avatar } from "@nextui-org/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  BookA,
  BookOpen,
  BriefcaseBusiness,
  CalendarClock,
  CalendarDays,
  Edit,
  ExternalLink,
  Hotel,
  List,
  Mail,
  Notebook,
  Phone,
  User,
  UserCheck,
  Users,
} from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Tab, Tabs } from "@nextui-org/tabs";
import MemberTab from "./MemberTab";

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
    tasks,
    availabilityStatus,
    projects,
  } = member;
  const { name, description } = team || {};
  console.log(`profileImg`, member);

  return (
    <div className="p-6 bg-white border rounded-lg max-w-5xl mx-auto">
      <div className="-ml-6 -mt-6 -mr-6 py-4 pl-6 items-center  rounded-t-lg mb-4 bg-[var(--primary-2)]">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <Avatar
              src={profileImg}
              // src="https://d2u8k2ocievbld.cloudfront.net/memojis/male/4.png"
              alt={`${firstName} ${lastName}`}
              className="w-16 h-16 mr-4 border-2 border-white"
              radius="rounded-full"
            />
            <div className="">
              <h2 className="text-3xl font-bold mb-1 tracking-wide text-white font-mono">{`${firstName} ${lastName}`}</h2>
              <p className="text-lg text-muted-foreground font-semibold text-slate-200 tracking-wide">
                #{designation}
              </p>{" "}
            </div>
          </div>
        </div>
      </div>{" "}
      <MemberTab member={member} team={team} />
    </div>
  );
};

export default MemberDetails;
