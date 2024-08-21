import React, { useEffect } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Spinner,
} from "@nextui-org/react";
import { CircleAlert, CircleCheck, Search } from "lucide-react";
import { Input } from "../ui/input";
import { searchTeamMember } from "@/lib/actions/dashboard/searchTeamMember";
import { toast } from "sonner";
import { ScrollArea } from "../ui/scroll-area";
import { motion } from "framer-motion";

export function SearchTabs() {
  const [search, setSearch] = React.useState("");
  const [result, setResult] = React.useState([]);
  const [membersData, setMembersData] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [selected, setSelected] = React.useState("team");

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
      },
    },
  };
  const typingEffect = {
    initial: { width: 0 },

    animate: { width: "100%" },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  const selectChange = (key) => {
    setSelected(key);
    setSearch("");
    setResult([]);
    setMembersData([]);
    setError(null);
  };
  const onEnter = async (e) => {
    if (e.key === "Enter") {
      setLoading(true);
      e.preventDefault();
      console.log("search", e.target.value);
      try {
        const reponse = await searchTeamMember(e.target.value, selected);
        console.log(reponse);
        if (reponse.success) {
          if (selected === "team") {
            setResult(reponse.team);
            setError(null);
            setLoading(false);
          } else {
            setMembersData(reponse.member);
            setError(null);
          }
        } else {
          setLoading(false);
          setMembersData([]);
          setResult([]);
          setError(reponse.error);
          toast.error(reponse.error);
        }
      } catch (error) {
        setLoading(false);
        setMembersData([]);
        setResult([]);
        setError(error);
        toast.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const reponse = await searchTeamMember("", selected);
        console.log(reponse);
        if (reponse.success) {
          if (selected === "team") {
            setResult(reponse.team);
          } else {
            setMembersData(reponse.member);
          }
        }
      } catch (error) {
        setMembersData([]);
        setResult([]);
        toast.error(reponse.error);
      } finally {
        setLoading(false);
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
            <motion.div
              className="w-full"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <form className="w-full" onKeyDown={onEnter}>
                <Input
                  placeholder={`Search ${selected}`}
                  value={search}
                  id="search"
                  onChange={(e) => setSearch(e.target.value)}
                  className=" pl-8 w-f focus-visible:ring-0"
                />{" "}
                <motion.div
                  className="absolute left-0 bottom-0 h-0.5 rounded-md bg-blue-500"
                  variants={typingEffect}
                  initial="initial"
                  animate={search ? "animate" : "initial"}
                />
              </form>
            </motion.div>
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
              <Card className="rounded-sm shadow-none">
                <ScrollArea className="h-52 transition-all ease-in-out duration-1000">
                  {loading ? (
                    <CardBody className="text-center">
                      <Spinner size="md" />
                    </CardBody>
                  ) : (
                    <CardBody>
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                      >
                        {!error && result.length > 0 ? (
                          result?.map((team) => (
                            <motion.div
                              key={team._id}
                              variants={itemVariants}
                              className="fadeIn last:border-none border-b py-2"
                            >
                              <div className="flex items-center gap-2">
                                <div className="flex flex-col  w-full">
                                  <h1 className="text-sm">
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
                            </motion.div>
                          ))
                        ) : (
                          <div className="mt-4 text-red-500">
                            {error || "No team found"}
                          </div>
                        )}
                      </motion.div>
                    </CardBody>
                  )}
                </ScrollArea>
              </Card>
            </Tab>
            <Tab key="member" title="Members">
              <Card className="rounded-sm shadow-none transition-all duration-1000">
                <ScrollArea className="h-52 p-0">
                  {loading ? (
                    <CardBody className="text-center">
                      <Spinner size="md" />
                    </CardBody>
                  ) : (
                    <CardBody>
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                      >
                        {!error && membersData.length > 0 ? (
                          membersData.map((member) => (
                            <motion.div
                              key={member._id}
                              variants={itemVariants}
                              className="fadeIn last:border-none border-b py-2"
                            >
                              <div className="flex items-center gap-2">
                                <Avatar
                                  alt={`${member.firstName} ${member.lastName}`}
                                  className="flex-shrink-0"
                                  size="sm"
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
                                              className={`font-semibold flex items-center text-red-500`}
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
                                        <p className="text-green-700">
                                          No Task
                                        </p>
                                      )}
                                    </>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))
                        ) : (
                          <div className="mt-4 text-red-500">
                            {error || "No member found"}
                          </div>
                        )}
                      </motion.div>
                    </CardBody>
                  )}
                </ScrollArea>
              </Card>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
