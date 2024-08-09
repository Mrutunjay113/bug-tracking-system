import React from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  Avatar,
} from "@nextui-org/react";
import { CircleAlert, CircleCheck, Search } from "lucide-react";
import { Input } from "../ui/input";

const teamData = [
  {
    _id: {
      $oid: "669e6eedf24af312f8c93419",
    },
    name: "dalla",
    teamleader: {
      $oid: "669e6e557820ac1ac1c4cc37",
    },
    members: [
      {
        $oid: "669e6deef66cf9bed6466676",
      },
    ],
    TeamRole: "Tester",
    description: "dalla not found",
    createdAt: {
      $date: "2024-07-22T14:38:37.165Z",
    },
    updatedAt: {
      $date: "2024-07-22T14:38:37.165Z",
    },
    __v: 0,
  },
  {
    _id: {
      $oid: "669e6a8ef66cf9bed6466632",
    },
    name: "sherrrrrrrrrrr",
    teamleader: {
      $oid: "669e69907820ac1ac1c4cc1f",
    },
    members: [
      {
        $oid: "669fdb924a8ac20c539dc113",
      },
    ],
    TeamRole: "UI/UX",
    description: "sherrrrrrrr ka baaaaaaaaaaaaaaacha",
    createdAt: {
      $date: "2024-07-22T14:19:58.196Z",
    },
    updatedAt: {
      $date: "2024-07-22T14:19:58.196Z",
    },
    __v: 0,
  },
];
const memberData = [
  {
    _id: {
      $oid: "669e6deef66cf9bed6466676",
    },
    userID: "user_5",
    firstName: "Aakash",
    lastName: "Yadav",
    email: "aakash@gmail.com",
    phoneNumber: "9800084949",
    designation: "Tester",
    profileImg: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/3.png",
    skills: ["react,java"],
    availabilityStatus: "Available",
    tasks: [
      {
        $oid: "669ead0f3393199c022a4390",
      },
    ],
    createdAt: {
      $date: "2024-07-22T14:34:22.722Z",
    },
    updatedAt: {
      $date: "2024-07-22T14:34:22.722Z",
    },
    __v: 0,
    team: "669e6eedf24af312f8c93419",
  },
  {
    _id: {
      $oid: "669e71e47820ac1ac1c4cc56",
    },
    userID: "user_6",
    firstName: "Mrutunjay",
    lastName: "Yadav",
    email: "Mrutunjay@gmail.com",
    phoneNumber: "9800084949",
    designation: "Developer",
    profileImg: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/4.png",
    skills: ["react,java"],
    availabilityStatus: "Available",
    tasks: [
      {
        $oid: "669ead0f3393199c022a4390",
      },
      {
        $oid: "66a3839e6b0f3419f8ec9008",
      },
    ],
    createdAt: {
      $date: "2024-07-22T14:34:22.722Z",
    },
    updatedAt: {
      $date: "2024-07-22T14:34:22.722Z",
    },
    __v: 0,
    team: "669e72d0f24af312f8c9344d",
  },
];
export function SearchTabs() {
  const [selected, setSelected] = React.useState("team");
  const selectChange = (key) => {
    setSelected(key);
  };

  return (
    <div className="flex w-full flex-col">
      <Card className="rounded-sm shadow-none border bg-white">
        <CardHeader>
          <div className="relative flex w-full items-center  ">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              placeholder={`Search ${selected}`}
              //   value={search}
              //   onChange={(event) => setSearch(event.target.value)}
              className=" pl-8 w-f"
            />
          </div>
        </CardHeader>
        <CardBody>
          <Tabs
            aria-label="Options"
            selectedKey={selected}
            onSelectionChange={selectChange}
            variant="light"
            classNames={{
              tabList:
                " w-full relative rounded-lg p-0.5 border-none bg-gray-100 ",

              tab: "data-[selected=true]:text-[#06b6d4] bg-gray-100 ",
              tabContent: "",
            }}
          >
            <Tab key="member" title="Members">
              <Card className="rounded-sm shadow-none ">
                <CardBody className="overflow-visible">
                  {memberData.map((team) => (
                    <div
                      key={team._id.$oid}
                      className="last:border-none border-b py-2"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar
                          alt={`${team.firstName} ${team.lastName}`}
                          className="flex-shrink-0"
                          size="sm"
                          src={team.profileImg}
                        />
                        <div className="flex flex-col  w-full">
                          <span className="text-sm">
                            {team.firstName} {team.lastName}
                          </span>
                          <div className=" text-tiny">
                            <>
                              {team.tasks.length > 0 ? (
                                <div>
                                  {team.tasks.length >= 2 ? (
                                    <span
                                      className={`font-semibold flex items-center 
                              text-red-500
                              `}
                                    >
                                      <CircleAlert className="w-4 mr-2" />
                                      {team.tasks.length} Task left
                                    </span>
                                  ) : (
                                    <span className="text-green-500 font-semibold flex items-center ">
                                      <CircleCheck className="w-4 mr-2 " />
                                      {team.tasks.length} Task left
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <p className="text-green-700">No Task</p>
                              )}
                            </>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardBody>
              </Card>
            </Tab>
            <Tab key="team" title="Teams">
              <Card className="rounded-sm shadow-none ">
                <CardBody className="overflow-visible ">
                  {teamData.map((team) => (
                    <div
                      className="last:border-none border-b py-2"
                      key={team._id.$oid}
                    >
                      <div className="flex items-center gap-2">
                        <Avatar
                          alt={`${team.name}`}
                          className="flex-shrink-0"
                          size="sm"
                          src={
                            team.profileImg ||
                            "https://d2u8k2ocievbld.cloudfront.net/memojis/female/3.png"
                          }
                        />
                        <div className="flex flex-col  w-full">
                          <h1 className="text-sm"> {team.name} (leaderName)</h1>
                          <div className="flex gap-2">
                            <div className=" text-tiny text-gray-500">
                              {team.TeamRole}
                            </div>
                            <div className=" text-tiny text-gray-500">
                              {team.description.length > 20
                                ? `${team.description.slice(0, 20)}...`
                                : team.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
