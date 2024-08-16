"use client";
import Heading from "@/components/Heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UserSelect from "@/components/UserSelectInput";
import { createTeam, getTeamLeader } from "@/lib/actions/team/action";
import { getMembersByDesignation } from "@/lib/actions/team/member/action";
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

  const handleTeamTypeChange = async (e) => {
    console.log(e.target.value);
    if (e.target.value) {
      fetchTeamLeader(e.target.value);
      fetchMembers(e.target.value);
    }
  };

  const users = [
    {
      _id: "669a4b15d779bfa5bc026ad2",
      firstName: "Mrutunjay",
      lastName: "Yadav",
      email: "my@gmail.com",
      profileImg: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/3.png",
    },
    {
      _id: "669b63a028f2523827b0b78e",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      profileImg: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/3.png",
    },
    // Add more users as needed
  ];
  const [selectedUsers, setSelectedUsers] = React.useState(new Set());

  const handleSelectionChange = (keys) => {
    console.log(`key`, keys);
    setValue("members", keys);
    setSelectedUsers(keys);
  };

  return (
    <main className="max-w-2xl mx-auto  md:p-8 p-2">
      <Heading headingTitle="Add Team" size="lg" className="mb-4" />
      <div>
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
            <select
              {...register("teamtype", { required: "Team type is required" })}
              id="teamtype"
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              onChange={handleTeamTypeChange}
            >
              <option value="">Select Team Type</option>
              <option value="Developer">Development</option>
              <option value="UI/UX">UI/UX</option>
              <option value="Tester">Testing</option>
              <option value="QA">QA</option>
            </select>

            {errors.teamtype && (
              <p className="text-red-500 text-sm mt-1">
                {errors.teamtype.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="teamlead">Team Lead</Label>
            <select
              {...register("teamlead", { required: "Team lead is required" })}
              id="teamlead"
              className="w-full p-2 border text-sm border-gray-300 rounded-md "
            >
              <option value="">Select Team Lead</option>
              {teamLeaders?.map((teamLead) => (
                <option
                  key={teamLead._id}
                  className="text-black"
                  value={teamLead._id}
                >
                  {`${teamLead.firstName} ${teamLead.lastName}`}
                </option>
              ))}
            </select>
            {errors.teamlead && (
              <p className="text-red-500 text-sm mt-1">
                {errors.teamlead.message}
              </p>
            )}
          </div>

          <UserSelect
            label="Assign to"
            selectionMode="multiple"
            placeholder="Select user"
            selectedKeys={selectedUsers}
            onSelectionChange={handleSelectionChange}
            // data={users}

            data={teamMembers}
          />
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
        </form>
      </div>
    </main>
  );
};

export default Page;
