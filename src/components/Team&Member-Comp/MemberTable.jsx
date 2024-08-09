"use client";
import React, { useCallback, useMemo } from "react";
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
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const fieldsToDisplay = [
  "profileImg",
  "email",
  "team",
  "designation",
  "availabilityStatus",
];

const fieldNameMapping = {
  profileImg: "Profile",
  email: "Email",
  team: "Team",
  designation: "Role",
  availabilityStatus: "Status",
};

export function MemberTable({ data }) {
  console.log(`data`, data);

  const statusColorMap = useMemo(
    () => ({
      Available: "success",
      Busy: "primary",
      Vacation: "warning",
      OnLeave: "danger",
    }),
    []
  );

  const renderCell = useCallback(
    (member, key) => {
      const cellValue = member[key];

      switch (key) {
        case "profileImg":
          return (
            <User
              avatarProps={{
                radius: "full",
                src: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/4.png",
              }}
              description={member.email}
              name={`${member.firstName} ${member.lastName}`}
            />
          );
        case "availabilityStatus":
          return (
            <Chip
              color={statusColorMap[cellValue]}
              className={classNames("text-white")}
            >
              {cellValue}
            </Chip>
          );
        case "team":
          const { name, description } = cellValue || {};
          return (
            <div>
              <p className="text-sm font-semibold text-gray-700">{name}</p>
              <p className="text-xs text-gray-400">{description}</p>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [statusColorMap] // Now it's safe to include statusColorMap here
  );

  return (
    <div className="md:space-y-6 md:p-8 p-2">
      <ScrollArea className="md:w-full max-w-64 w-max md:max-w-full">
        <div className="p-2">
          <Table radius="sm" aria-label="Member table">
            <TableHeader>
              {fieldsToDisplay.map((key) => (
                <TableColumn className="text-sm" key={key}>
                  {fieldNameMapping[key]}
                </TableColumn>
              ))}
            </TableHeader>
            {data !== undefined ? (
              <TableBody>
                {data?.map((member) => (
                  <TableRow key={member.userID}>
                    {fieldsToDisplay.map((key) => (
                      <TableCell className="" key={key}>
                        {renderCell(member, key)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody
                emptyContent={
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-gray-500">No Members found</p>
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
