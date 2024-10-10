"use client";
import Heading from "@/components/Heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UserSelect from "@/components/UserSelectInput";
import { createTeam, getTeamLeader } from "@/lib/actions/team/action";
import { getMembersByDesignation } from "@/lib/actions/team/member/action";
import { ISSUE_TYPES } from "@/lib/data";
import { Button } from "@nextui-org/button";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Page = () => {
  const [teamLeaders, setTeamLeaders] = React.useState([]);
  const [teamMembers, setTeamMembers] = React.useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    const formatedData = {
      name: data.name,
      description: data.description,
      teamtype: data.teamtype,
      teamlead: data.teamlead,
      members: Array.from(data.members),
    };
    const response = await createTeam(formatedData);
    console.log(`response`, response);
    if (response.success) {
      toast.success("Team added successfully");
    } else {
      toast.error("Error adding team");
    }
  };
  const fetchTeamLeader = async (teamType) => {
    const { success, error, teamLeaders } = await getTeamLeader(teamType);
    if (!success) {
      toast.error(error);
    }
    console.log(`t`, teamLeaders);
    setTeamLeaders(teamLeaders);
  };

  const fetchMembers = async (teamType) => {
    const { success, error, members } = await getMembersByDesignation(teamType);
    if (!success) {
      toast.error(error);
    }
    setTeamMembers(members);

    console.log(`members`, members);
  };

  const handleTeamTypeChange = async (value) => {
    console.log(value);
    if (value) {
      fetchTeamLeader(value);
      fetchMembers(value);
      setValue("teamtype", value);
    }
  };

  const [selectedUsers, setSelectedUsers] = React.useState(new Set());

  const handleSelectionChange = (keys) => {
    console.log(`key`, keys);
    setValue("members", keys);
    setSelectedUsers(keys);
  };

  return (
    <main className="">
      <div className="bg-[#F6F6F6] border-b border-gray-400  margin-5 py-10">
        <Heading
          headingTitle="Add Team"
          size="lg"
          className="text-gray-800  uppercase tracking-wide md:ml-10 ml-4"
        />
      </div>
      <div className="max-w-2xl mx-auto  md:py-8 p-2">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register("name", { required: "Name is required" })}
              type="text"
              placeholder="Enter name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              type="text"
              placeholder="Enter description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="teamtype">Team type</Label>
            <Select
              onValueChange={(value) => handleTeamTypeChange(value)}
              {...register("teamtype", { required: "teamtype is required" })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Team Type" />
              </SelectTrigger>
              <SelectContent>
                {ISSUE_TYPES.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {errors.teamtype && (
              <p className="text-red-500 text-sm mt-1">
                {errors.teamtype.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="teamlead">Team Lead</Label>
            <Select
              // onValueChange={(value) => {
              //   setValue("issueType", value);
              // }}
              onValueChange={(value) => {
                setValue("teamlead", value);
              }}
              {...register("teamlead", { required: "teamlead is required" })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Team Leader" />
              </SelectTrigger>
              <SelectContent>
                {teamLeaders?.map((item) => (
                  <SelectItem key={item._id} value={item._id}>
                    {item.firstName} {item.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {errors.teamlead && (
              <p className="text-red-500 text-sm mt-1">
                {errors.teamlead.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="teamlead">Select Team Members</Label>
            <UserSelect
              // label="Assign to"
              selectionMode="single"
              placeholder="Select member"
              selectedKeys={selectedUsers}
              onSelectionChange={handleSelectionChange}
              // data={users}

              data={teamMembers}
            />
          </div>
          <div className="pt-3">
            {" "}
            <Button
              type="submit"
              color="primary"
              radius="sm"
              className="w-full"
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
            >
              {isSubmitting ? "" : "Add"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Page;
