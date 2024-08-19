"use client";
import React, { useCallback, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { User } from "@nextui-org/user";
import classNames from "classnames";
import { Chip } from "@nextui-org/chip";
import { Button } from "@nextui-org/button";
import { Input } from "../ui/input";
import Link from "next/link";
import { Briefcase, Code, CodeXml, Mail, Phone, Plus } from "lucide-react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Avatar, AvatarGroup } from "@nextui-org/avatar";

// Define the fields to display and their order
const fieldsToDisplay = [
  "userInfo",
  "teamName",
  "teamDescription",
  "teamRole",
  "members",
];

const StatusChip = ({ status }) => {
  const statusColorMap = {
    Available: "success",
    Busy: "primary",
    Vacation: "warning",
    OnLeave: "secondary",
  };
  return <Chip color={statusColorMap[status]}>{status}</Chip>;
};

// Define a mapping from field names to display names
const fieldNameMapping = {
  userInfo: "Team Leader",
  teamName: "Team Name",
  teamDescription: "Description",
  teamRole: "Role",
  members: "Members",
};

export function TeamTable({ data }) {
  console.log(`tdata`, data);
  const [selectedUser, setSelectedUser] = useState({
    selected: "member" ? "member" : "other" ? "other" : null,
    data: [],
  });

  const handleAvatarClick = (member) => {
    console.log(`member`, member);
    if (member.selected === "member") {
      setSelectedUser({
        selected: "member",
        data: {
          firstName: member.data.firstName,
          lastName: member.data.lastName,
          email: member.data.email,
          profileImg: member.data.profileImg,
          phoneNumber: member.data.phoneNumber,
          team: member.data.team,
          designation: member.data.designation,
          skills: member.data.skills,
          availabilityStatus: member.data.availabilityStatus,
        },
      });
    }
    if (member.selected === "other") {
      setSelectedUser({
        selected: "other",
        data: [],
      });
    }
  };

  const renderCell = useCallback(
    (team, key) => {
      switch (key) {
        case "teamName":
          return (
            <p className="text-sm font-semibold text-gray-700">{team.name}</p>
          );
        case "teamDescription":
          return <p className="text-sm text-gray-500">{team.description}</p>;
        case "teamRole":
          return <p className="text-sm text-gray-500">{team.TeamRole}</p>;
        case "members":
          return (
            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <div className="flex items-center space-x-2">
                  {team.members.length > 0 && (
                    <>
                      <AvatarGroup
                        isBordered
                        as="button"
                        max={2}
                        total={team.members.length - 2}
                        renderCount={(count) => (
                          <p
                            onClick={() =>
                              handleAvatarClick({
                                selected: "other",
                                data: team.members,
                              })
                            }
                            className="text-small  text-foreground font-medium ms-2"
                          >
                            +{count} others
                          </p>
                        )}
                      >
                        {team.members.map((member) => (
                          <div
                            key={member._id}
                            onClick={() =>
                              handleAvatarClick({
                                selected: "member",
                                data: member,
                              })
                            }
                          >
                            <Avatar
                              src={
                                "https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png"
                              }
                            />
                          </div>
                        ))}
                      </AvatarGroup>
                    </>
                  )}
                </div>
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="light">
                {selectedUser.selected === "member" ? (
                  <DropdownItem
                    textValue={`${selectedUser.data.firstName} ${selectedUser.data.lastName}`}
                  >
                    <div className="p-2">
                      <User
                        className=""
                        avatarProps={{
                          radius: "full",
                          // src: "/assets/images/user_preview.png",
                          src: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/4.png",
                        }}
                        description={selectedUser.data.email}
                        name={`${selectedUser.data.firstName} ${selectedUser.data.lastName}`}
                      />
                      <div className="mt-4 items-center space-y-2">
                        <div className="text-sm font-semibold text-gray-600 flex items-center">
                          <span className="mr-2">
                            <Briefcase size={16} />
                          </span>
                          {selectedUser.data.designation}
                        </div>
                        <div className="text-sm flex items-center">
                          <span className="mr-2 text-gray-600">
                            <Mail size={16} />
                          </span>
                          {selectedUser.data.email}
                        </div>
                        <div className="text-sm text-gray-600 flex items-center">
                          <span className="mr-2">
                            <Phone size={16} />
                          </span>
                          {selectedUser.data.phoneNumber}
                        </div>
                        <div className="text-sm text-gray-600 flex items-center">
                          <span className="mr-2">
                            <CodeXml size={16} />
                          </span>
                          {selectedUser.data.skills}
                        </div>
                        <p className="text-sm text-gray-600">
                          {
                            <StatusChip
                              status={selectedUser.data.availabilityStatus}
                            />
                          }
                        </p>
                      </div>
                    </div>
                  </DropdownItem>
                ) : (
                  selectedUser.selected === "other" &&
                  team?.members?.map((member) => (
                    <DropdownItem
                      key={member._id}
                      textValue={`${member.firstName} ${member.lastName}`}
                    >
                      <div className="p-2">
                        <User
                          className=""
                          avatarProps={{
                            radius: "full",
                            src: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/5.png",
                          }}
                          description={team.userInfo.email}
                          name={`${team.userInfo.firstName} ${team.userInfo.lastName}`}
                        />
                        {/* <div className="mt-4 items-center space-y-2">
                          <p className="text-sm font-semibold text-gray-600">
                            {member.designation}
                          </p>
                          <p className="text-sm text-blue-600">
                            {member.email}
                          </p>
                          <p className="text-sm text-gray-600">
                            {member.phoneNumber}
                          </p>
                          <p className="text-sm text-gray-600">
                            {member.skills}
                          </p>
                          <p className="text-sm text-gray-600">
                            {member.availabilityStatus}
                          </p>
                        </div> */}
                      </div>
                    </DropdownItem>
                  ))
                )}
              </DropdownMenu>
            </Dropdown>
          );
        case "userInfo":
          return (
            <div className="flex items-center">
              <User
                avatarProps={{
                  radius: "full",
                  src: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/4.png",
                }}
                description={team.userInfo.email}
                name={`${team.userInfo.firstName} ${team.userInfo.lastName}`}
              />
            </div>
          );
        default:
          return null;
      }
    },
    [selectedUser]
  );

  return (
    <div className="md:space-y-6 md:p-8 p-2  ">
      <ScrollArea className="md:w-full max-w-64 w-max md:max-w-full overflow-auto">
        <div className="p-2">
          <Table radius="sm" aria-label="Team table">
            <TableHeader>
              {fieldsToDisplay.map((key) => (
                <TableColumn className="text-sm" key={key}>
                  {fieldNameMapping[key]}
                </TableColumn>
              ))}
            </TableHeader>
            {data !== undefined ? (
              <TableBody>
                {data?.map((team) => (
                  <TableRow key={team._id}>
                    {fieldsToDisplay.map((key) => (
                      <TableCell className="" key={key}>
                        {renderCell(team, key)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody
                emptyContent={
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-gray-500">No teams found</p>
                  </div>
                }
              >
                {[]}
              </TableBody>
            )}
          </Table>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
