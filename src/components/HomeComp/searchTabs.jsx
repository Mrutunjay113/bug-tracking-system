import React, { useEffect } from "react";
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
import { searchTeamMember } from "@/lib/actions/dashboard/searchTeamMember";
import { toast } from "sonner";
import { ScrollArea } from "../ui/scroll-area";

// const teamData = [
//   {
//     teamResults: [
//       {
//         _id: "669e6eedf24af312f8c93419",
//         name: "dalla",
//         teamleader: "669e6e557820ac1ac1c4cc37",
//         members: ["669e6deef66cf9bed6466676"],
//         TeamRole: "Tester",
//         description: "dalla not found",
//         createdAt: "2024-07-22T14:38:37.165Z",
//         updatedAt: "2024-07-22T14:38:37.165Z",
//         __v: 0,
//       },
//     ],
//     users: [
//       {
//         verification: {
//           verified: false,
//         },
//         _id: "669e6e557820ac1ac1c4cc37",
//         username: "Aakash12345",
//         email: "TeamAakash@gmail.com",
//         roles: ["UI/UX"],
//         isActive: true,
//         createdAt: "2024-07-20T08:19:49.216Z",
//         updatedAt: "2024-07-20T08:19:49.216Z",
//         __v: 0,
//         firstName: "Aakash L",
//         lastName: "Yadav",
//         status: "active",
//         image:
//           "https://res.cloudinary.com/dkeihjsml/image/upload/v1721565543/issueImg/vlhzyvjup6zcnwotqu9b.png",
//         designation: "Tester",
//         team: "669e6eedf24af312f8c93419",
//       },
//     ],
//   },
// ];

// console.log(teamData.map((team) => team.teamResults.map((team) => team.name)));
// const memberData = [
//   {
//     _id: {
//       $oid: "669e6deef66cf9bed6466676",
//     },
//     userID: "user_5",
//     firstName: "Aakash",
//     lastName: "Yadav",
//     email: "aakash@gmail.com",
//     phoneNumber: "9800084949",
//     designation: "Tester",
//     profileImg: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/3.png",
//     skills: ["react,java"],
//     availabilityStatus: "Available",
//     tasks: [
//       {
//         $oid: "669ead0f3393199c022a4390",
//       },
//     ],
//     createdAt: {
//       $date: "2024-07-22T14:34:22.722Z",
//     },
//     updatedAt: {
//       $date: "2024-07-22T14:34:22.722Z",
//     },
//     __v: 0,
//     team: "669e6eedf24af312f8c93419",
//   },
//   {
//     _id: {
//       $oid: "669e71e47820ac1ac1c4cc56",
//     },
//     userID: "user_6",
//     firstName: "Mrutunjay",
//     lastName: "Yadav",
//     email: "Mrutunjay@gmail.com",
//     phoneNumber: "9800084949",
//     designation: "Developer",
//     profileImg: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/4.png",
//     skills: ["react,java"],
//     availabilityStatus: "Available",
//     tasks: [
//       {
//         $oid: "669ead0f3393199c022a4390",
//       },
//       {
//         $oid: "66a3839e6b0f3419f8ec9008",
//       },
//     ],
//     createdAt: {
//       $date: "2024-07-22T14:34:22.722Z",
//     },
//     updatedAt: {
//       $date: "2024-07-22T14:34:22.722Z",
//     },
//     __v: 0,
//     team: "669e72d0f24af312f8c9344d",
//   },
// ];
export function SearchTabs() {
  const [search, setSearch] = React.useState("");
  const [result, setResult] = React.useState([]);
  const [membersData, setMembersData] = React.useState([]);
  const [error, setError] = React.useState(null);

  const [selected, setSelected] = React.useState("team");
  const selectChange = (key) => {
    setSelected(key);
    setSearch("");
  };
  const onEnter = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log("search", e.target.value);

      const reponse = await searchTeamMember(e.target.value, selected);
      console.log(reponse);
      if (reponse.success) {
        if (selected === "team") {
          setResult(reponse.team);
          setError(null);
        } else {
          setMembersData(reponse.member);
          setError(null);
        }
      } else {
        setMembersData([]);
        setResult([]);
        setError(reponse.error);
        toast.error(reponse.error);
      }
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const reponse = await searchTeamMember("", selected);
      console.log(reponse);
      if (reponse.success) {
        if (selected === "team") {
          setResult(reponse.team);
        } else {
          setMembersData(reponse.member);
        }
      } else {
        setMembersData([]);
        setResult([]);
        toast.error(reponse.error);
      }
    };
    fetch();
  }, [selected]);

  return (
    <div className="flex w-full flex-col ">
      <Card className="rounded-md shadow-none border bg-white">
        <CardHeader>
          <div className="relative flex w-full items-center  ">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
            <form className="w-full" onKeyDown={onEnter}>
              <Input
                placeholder={`Search ${selected}`}
                value={search}
                id="search"
                onChange={(e) => setSearch(e.target.value)}
                className=" pl-8 w-f"
              />
            </form>
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
                " w-full relative rounded-xl p-0.5 border-none bg-gray-100 ",

              tab: "data-[selected=true]:text-[#06b6d4] bg-gray-100 ",
              tabContent: "",
            }}
          >
            <Tab key="team" title="Teams">
              <Card className="rounded-sm shadow-none ">
                <ScrollArea className="h-40 transition-all ease-in-out duration-1000">
                  <CardBody className=" ">
                    {search && result && (
                      <div className=" ">
                        <span className="text-gray-500">Result of: </span>
                        <span className="font-semibold text-gray-600">
                          {search}
                        </span>
                      </div>
                    )}
                    {!error && result.length > 0 ? (
                      result?.map((team) => (
                        <div
                          className="last:border-none border-b py-2"
                          key={team._id}
                        >
                          <div className="flex items-center gap-2">
                            {/* <Avatar
                          alt={`${team.name}`}
                          className="flex-shrink-0"
                          size="sm"
                          src={
                            team.profileImg ||
                            "https://d2u8k2ocievbld.cloudfront.net/memojis/female/3.png"
                          }
                        /> */}
                            <div className="flex flex-col  w-full">
                              <h1 className="text-sm">
                                {" "}
                                {team.name}{" "}
                                {` | @${team.teamleader.firstName} ${team.teamleader.lastName}`}
                              </h1>
                              <div className="flex gap-2">
                                <div className=" text-tiny text-gray-500">
                                  {team.TeamRole}
                                </div>
                                <div className=" text-tiny text-gray-500">
                                  |{" "}
                                  {team.description.length > 20
                                    ? `${team.description.slice(0, 20)}...`
                                    : team.description}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className=" mt-4 text-red-500">
                        {error || "No team found"}
                      </div>
                    )}
                  </CardBody>
                </ScrollArea>
              </Card>
            </Tab>
            <Tab key="member" title="Members">
              <Card className="rounded-sm shadow-none transition-all duration-1000">
                <ScrollArea className="h-40 p-0">
                  <CardBody className="overflow-visible">
                    {search && membersData && (
                      <div className=" ">
                        <span className="text-gray-500">Result of: </span>
                        <span className="font-semibold text-gray-600">
                          {search}
                        </span>
                      </div>
                    )}
                    {!error && membersData.length > 0 ? (
                      membersData.map((member) => (
                        <div
                          key={member._id}
                          className="last:border-none border-b py-2"
                        >
                          <div className="flex items-center gap-2">
                            <Avatar
                              alt={`${member.firstName} ${member.lastName}`}
                              className="flex-shrink-0"
                              size="sm"
                              // src={team.profileImg}
                              src="https://d2u8k2ocievbld.cloudfront.net/memojis/male/3.png"
                            />
                            <div className="flex flex-col  w-full">
                              <span className="text-sm">
                                {member.firstName} {member.lastName}
                              </span>
                              <div className=" text-tiny">
                                <>
                                  {member.tasks.length > 0 ? (
                                    <div>
                                      {member.tasks.length >= 2 ? (
                                        <span
                                          className={`font-semibold flex items-center 
                              text-red-500
                              `}
                                        >
                                          <CircleAlert className="w-4 mr-2" />
                                          {member.tasks.length} Task left
                                        </span>
                                      ) : (
                                        <span className="text-green-500 font-semibold flex items-center ">
                                          <CircleCheck className="w-4 mr-2 " />
                                          {member.tasks.length} Task left
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
                      ))
                    ) : (
                      <div className=" mt-4 text-red-500">
                        {error || "No member found"}
                      </div>
                    )}
                  </CardBody>
                </ScrollArea>
              </Card>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
