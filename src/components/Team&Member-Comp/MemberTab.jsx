"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookA,
  BookOpen,
  BriefcaseBusiness,
  CalendarClock,
  CalendarDays,
  Circle,
  CircleX,
  Code,
  Contact,
  Edit,
  ExternalLink,
  Hotel,
  LayoutList,
  List,
  Mail,
  Notebook,
  Phone,
  SquareX,
  User,
  UserCheck,
  UserCog,
  Users,
} from "lucide-react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Button, buttonVariants } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import Link from "next/link";
import { Chip } from "@nextui-org/chip";
const MemberTab = ({ member, team }) => {
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

  const [isEditing, setIsEditing] = React.useState(false);
  const [selected, setSelected] = React.useState("personal-info");

  const availabilityStatusArray = {
    Available: "Available",
    Busy: "Busy",
    OnLeave: "On Leave",
  };
  const handleChange = (e) => {
    setIsEditing(false);
    setSelected(e);
  };

  return (
    <div className="flex w-full flex-col mt-5">
      <Tabs
        aria-label="Member Information"
        color="primary"
        variant="underlined"
        selectedKey={selected}
        onSelectionChange={(e) => handleChange(e)}
        classNames={{
          tabList:
            "gap-6 w-fit relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-[#2563EB]",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-[#2563EB]",
        }}
      >
        {/* Personal Information Tab */}
        <Tab
          key="personal-info"
          title={
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Personal Information</span>
            </div>
          }
        >
          <Card className="p-4">
            <CardHeader>
              <CardTitle className="flex items-center justify-between ">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">
                    <Contact />
                  </span>
                  Personal Information
                </div>
                <div
                  className="flex text-muted-foreground cursor-pointer hover:text-gray-800"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? (
                    <SquareX className="w-5 h-5 " />
                  ) : (
                    <Edit className="w-5 h-5 " />
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid w-full items-center gap-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span className="flex">
                  {firstName} {lastName}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>{email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>{phoneNumber}</span>
              </div>
              <div className="flex items-center space-x-2">
                <UserCog className="w-5 h-5" />
                <span>{designation}</span>
              </div>
              <div className="flex items-center space-x-2">
                <LayoutList className="w-5 h-5" />
                <span>
                  {tasks?.length > 0 ? tasks.length : "No tasks listed"}
                </span>
              </div>
            </CardContent>
            {isEditing && (
              <CardFooter className="flex gap-4 justify-end">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button className=" bg-[#1A2334]  hover:bg-[#44464b]">
                  Save Changes
                </Button>
              </CardFooter>
            )}
          </Card>
        </Tab>

        {/* Skills & Availability Tab */}
        <Tab
          key="skills-availability"
          title={
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Skills & Availability</span>
            </div>
          }
        >
          <Card className="p-4">
            {" "}
            <CardHeader>
              <CardTitle className="flex items-center justify-between ">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">
                    <Contact />
                  </span>
                  Skills & Availability
                </div>
                <div
                  className="flex text-muted-foreground cursor-pointer hover:text-gray-800"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? (
                    <SquareX className="w-5 h-5 " />
                  ) : (
                    <Edit className="w-5 h-5 " />
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid w-full items-center gap-4">
              <div className="flex items-center gap-2">
                {" "}
                <div className="text-md font-medium tracking-tight">
                  Skills:
                </div>
                <div className="flex items-center ">{skills?.join(", ")}</div>
              </div>
              <div className="flex items-center gap-2">
                {" "}
                <div className="text-md font-medium tracking-tight">
                  Availability:
                </div>
                {availabilityStatusArray[availabilityStatus]}
              </div>
              <div className="flex items-center">
                <span className="">
                  <div className="flex   items-center">
                    <BriefcaseBusiness
                      className="text-slate-500 mr-2"
                      size={18}
                    />

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
            </CardContent>{" "}
            {isEditing && (
              <CardFooter className="flex gap-4 justify-end">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button className=" bg-[#1A2334]  hover:bg-[#44464b]">
                  Save Changes
                </Button>
              </CardFooter>
            )}
          </Card>
        </Tab>

        {/* Team Information Tab */}
        <Tab
          key="team-info"
          title={
            <div className="flex items-center space-x-2">
              <BriefcaseBusiness className="w-5 h-5" />
              <span>Team Information</span>
            </div>
          }
        >
          <Card className="p-4">
            <CardHeader>
              <CardTitle className="flex items-center justify-between ">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">
                    <Contact />
                  </span>
                  Team Information
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid w-full items-center gap-4">
              <div className="flex items-center gap-2 ">
                <h2 className="text-md font-semibold tracking-tight capitalize">
                  Team Name:
                </h2>
                <div className="flex items-center gap-2 text-gray-700 font-medium capitalize">
                  {name}
                </div>
              </div>
              <div className="flex items-center gap-2 ">
                <h2 className="text-md font-semibold tracking-tight capitalize">
                  Team Description:
                </h2>
                <div className="flex items-center gap-2 text-gray-700 font-medium capitalize">
                  {description}
                </div>
              </div>
            </CardContent>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default MemberTab;
