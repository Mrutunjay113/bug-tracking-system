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
import {
  BookA,
  BookOpen,
  BriefcaseBusiness,
  CalendarClock,
  CalendarDays,
  ExternalLink,
  Hotel,
  List,
  Mail,
  Notebook,
  Phone,
  User,
  Users,
} from "lucide-react";
import Heading from "@/components/Heading";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

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
      <div className="flex -ml-6 -mt-6 -mr-6 py-4 pl-6 items-center rounded-t-lg mb-4 bg-gray-300">
        <Avatar
          // src={profileImg}
          src="https://d2u8k2ocievbld.cloudfront.net/memojis/male/4.png"
          alt={`${firstName} ${lastName}`}
          className="w-16 h-16 mr-4 border-2 border-white"
          radius="rounded-full"
        />
        <div>
          <h2 className="text-3xl font-bold mb-1 tracking-wide font-mono">{`${firstName} ${lastName}`}</h2>
          <p className="text-lg text-muted-foreground font-medium tracking-wide">
            #{designation}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold flex items-center">
            <span>
              <Phone className="text-slate-500 mr-2" size={20} />
            </span>
            Contact Information
          </h3>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-2">
            <Mail className="text-slate-500 mr-2" size={18} />
            <span>{email}</span>
          </div>
          <div className="flex items-center mb-2">
            <Phone className="text-slate-500 mr-2" size={18} />
            <span>{phoneNumber}</span>
          </div>
          <div className="flex items-center mb-2">
            <Hotel className="text-slate-500 mr-2" size={18} />
            <span>{designation}</span>
          </div>

          <div className="flex items-center mb-2">
            <Hotel className="text-slate-500 mr-2" size={18} />
            <span>{tasks?.length}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <h3 className="text-xl font-semibold flex items-center">
            <span>
              <BriefcaseBusiness className="text-slate-500 mr-2" size={20} />
            </span>
            Skills & Availability
          </h3>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-2">
            <Notebook className="text-slate-500 mr-2" size={18} />
            <span>Skills: {skills?.join(", ")}</span>
          </div>
          <div className="flex items-center">
            <User className="text-slate-500 mr-2" size={18} />
            <span>Status: {availabilityStatus}</span>
          </div>
          <div className="flex items-center">
            <span className="">
              <div className="flex   items-center">
                <BriefcaseBusiness className="text-slate-500 mr-2" size={18} />

                {projects.length > 0 ? (
                  <span className="text-md font-medium tracking-tight">
                    Projects({projects.length}):
                  </span>
                ) : (
                  <span className="text-md font-medium tracking-tight">
                    No projects
                  </span>
                )}
              </div>
            </span>
            {projects?.length > 0 &&
              projects.map((project) => (
                <HoverCard key={project._id} className="w-full">
                  <HoverCardTrigger asChild target="">
                    <span
                      className={buttonVariants({
                        variant: "link",
                        className: "gap-1.5",
                      })}
                    >
                      #{project.title}
                    </span>
                  </HoverCardTrigger>
                  <HoverCardContent
                    className={`w-full min-w-[200px] ${
                      project.status === "Closed" ? "bg-[#eaebee]" : ""
                    }`}
                  >
                    <div className="flex justify-between space-x-4 w-full">
                      <div className="space-y-1 w-full" key={project._id}>
                        <div
                          className={`border-b pb-1 text-xl  font-semibold tracking-tight  capitalize ${
                            project.status === "Closed"
                              ? "border-slate-300"
                              : ""
                          }`}
                        >
                          {project.title}
                        </div>
                        <p className="text-sm leading-7">
                          Desc:{" "}
                          {project.description.length > 50
                            ? project.description.slice(0, 20) + "..."
                            : project.description}
                        </p>
                        <div className="flex items-center pt-2">
                          <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                          <span className="text-sm text-muted-foreground">
                            {new Date(
                              project?.statusDates?.Open
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>

                        <div className="text-sm text-muted-foreground">
                          Status:{" "}
                          <span className="text-sm font-semibold tracking-tight">
                            {project.status}
                          </span>
                        </div>

                        <div className="text-sm text-muted-foreground">
                          Priority: {project.priority}
                        </div>
                        <div className=" items-center text-sm text-muted-foreground">
                          type : {project.type}
                        </div>

                        <div className="flex items-center ">
                          <CalendarClock className="mr-2 h-4 w-4 opacity-70" />{" "}
                          <span className="text-sm text-muted-foreground text-red-500 font-normal">
                            {new Date(project?.dueDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    </div>{" "}
                    <Link
                      className={buttonVariants({
                        variant: "link",
                        className:
                          "gap-1.5 w-full bg-slate-100 hover:bg-slate-200 mt-2",
                      })}
                      href={`/dashboard/issues/${project._id}`}
                    >
                      View Project{" "}
                      <span className="">
                        <ExternalLink className="h-4 w-4" />
                      </span>
                    </Link>
                  </HoverCardContent>
                </HoverCard>
              ))}
          </div>
        </CardContent>
      </Card>

      {team && (
        <Card className="mt-4">
          <CardHeader>
            <h3 className="text-xl flex items-center font-semibold">
              <span>
                <Users className="text-slate-500 mr-2" size={20} />
              </span>
              Team Information
            </h3>
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

      <CardFooter className="mt-4 text-slate-600">
        {/* <span>Last updated on {new Date(updatedAt).toLocaleDateString()}</span> */}
      </CardFooter>
    </div>
  );
};
export default async function Page({ params }) {
  const { id } = params;
  const { data } = await getMemberById(id);
  const member = (await data?.member) || {};
  const teams = data?.team;
  console.log(`member`, member);

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
