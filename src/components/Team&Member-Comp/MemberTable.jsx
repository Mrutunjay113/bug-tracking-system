"use client";
import React, { useCallback } from "react";
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
import { Plus } from "lucide-react";

// Define the fields to display and their order
const fieldsToDisplay = [
  "profileImg",
  "email",
  "team",
  "designation",
  "availabilityStatus",
];

// Define a mapping from field names to display names
const fieldNameMapping = {
  profileImg: "Profile",
  email: "Email",
  team: "Team",
  designation: "Role",
  availabilityStatus: "Status",
};

export function MemberTable({ data }) {
  console.log(`data`, data);

  const statusColorMap = {
    Available: "success",
    Busy: "primary",
    Vacation: "warning",
    OnLeave: "secondary",
  };

  const renderCell = useCallback((member, key) => {
    const cellValue = member[key];

    switch (key) {
      case "profileImg":
        return (
          <User
            avatarProps={{ radius: "full", src: member.profileImg }}
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
        // Extract team name and description
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
  }, []);

  return (
    <div className="space-y-6">
      <div className=" md:flex justify-start gap-5 ">
        <Input
          type="text"
          placeholder="Search"
          className="w-80 border rounded-md p-2 md:mb-0 mb-2"
        />

        <Link href="/dashboard/members/add-member">
          <Button color="primary" radius="sm" size="md">
            Add Member
            <span>
              <Plus size={18} />
            </span>
          </Button>
        </Link>
      </div>
      <div className="">
        <div className="">
          <Table radius="sm" aria-label="Member table">
            <TableHeader>
              {fieldsToDisplay.map((key) => (
                <TableColumn className="text-sm" key={key}>
                  {fieldNameMapping[key]}
                </TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {data.map((member) => (
                <TableRow key={member.userID}>
                  {fieldsToDisplay.map((key) => (
                    <TableCell className="" key={key}>
                      {renderCell(member, key)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
