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
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";
import { Eye } from "lucide-react";
import { Tooltip } from "@nextui-org/tooltip";
import { useRouter } from "next/navigation";

const fieldsToDisplay = [
  "profileImg",
  "email",
  "team",
  "designation",
  "availabilityStatus",
  "action",
];

const fieldNameMapping = {
  profileImg: "Profile",
  email: "Email",
  team: "Team",
  designation: "Role",
  availabilityStatus: "Status",
  action: "Action",
};

export function MemberTable({ data }) {
  const router = useRouter();

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
                src:
                  member.profileImg ||
                  "https://d2u8k2ocievbld.cloudfront.net/memojis/male/4.png",
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

        case "action":
          return (
            <div className="flex justify-start items-center text-center">
              <Tooltip content="Details">
                <span
                  className="text-lg text-default-400 cursor-pointer"
                  onClick={() =>
                    router.push(`/dashboard/members/${member._id}`)
                  }
                >
                  <Eye />
                </span>
              </Tooltip>
              {/* <Tooltip content="Edit user">
                <span
                  className="text-lg text-default-400 cursor-pointer"
                  onClick={() => onEdit(member)}
                >
                  <Edit />
                </span>
              </Tooltip> */}
              {/* <Tooltip color="danger" content="Delete user">
                <span
                  className="text-lg text-danger cursor-pointer"
                  onClick={() => onDelete(member)}
                >
                  <Trash />
                </span>
              </Tooltip> */}
            </div>
          );

        default:
          return cellValue;
      }
    },
    [statusColorMap]
  );

  return (
    <div className="md:space-y-6 md:p-8 p-2">
      <div className="w-full overflow-x-auto">
        <ScrollArea className="w-full">
          <div className="min-w-full p-2">
            <Table radius="sm" aria-label="Member table" className="w-full">
              <TableHeader>
                {fieldsToDisplay.map((key) => (
                  <TableColumn key={key}>{fieldNameMapping[key]}</TableColumn>
                ))}
              </TableHeader>
              <TableBody>
                {data?.length > 0 ? (
                  data.map((member) => (
                    <TableRow key={member.userID}>
                      {fieldsToDisplay.map((key) => (
                        <TableCell className="" key={key}>
                          {renderCell(member, key)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={fieldsToDisplay.length}
                      className="text-center text-gray-500"
                    >
                      No Members found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>{" "}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
