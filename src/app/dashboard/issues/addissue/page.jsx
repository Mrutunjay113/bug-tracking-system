"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createIssue } from "@/lib/actions/issue/action";
import {
  getTeam,
  getTeamMembers,
  getTeamRole,
} from "@/lib/actions/team/action";
import { toast } from "sonner";
import { Cross, SquareX, X } from "lucide-react";
import { Button } from "@nextui-org/button";
import Heading from "@/components/Heading";
import { Avatar } from "@nextui-org/avatar";
import { Image } from "@nextui-org/image";
import { DatePickerWithPresets } from "@/components/DatePicker";

const AddIssueForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();
  const [teams, setTeams] = useState([]);
  const [image, setImage] = useState(null);
  const [members, setMembers] = useState([]);
  const [showImgs, setShowImgs] = useState(false);

  const fetchTeams = async (TeamRole) => {
    try {
      console.log(`TeamRole`, TeamRole);
      const response = await getTeamRole(TeamRole); // Adjust the endpoint as needed
      console.log(`response`, response);
      setTeams(response?.team);
      setValue("team", response?.team[0]?._id);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const fetchTeamMembers = async (teamId) => {
    console.log(`teamId`, teamId);
    try {
      if (!teamId) {
        return;
      }
      const response = await getTeamMembers(teamId); // Adjust the endpoint as needed
      console.log(`response`, response);

      setMembers(response?.members);
      const showMembers = response?.members.map((member) => member.firstName);
      console.log(showMembers);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  const onTeamChange = (event) => {
    const teamId = event.target.value;
    fetchTeamMembers(teamId);
  };

  const onIssueTypeChange = (event) => {
    const issueType = event.target.value;
    console.log(issueType);
    fetchTeams(issueType);
    setValue("issueType", issueType);
  };
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setImage(URL.createObjectURL(file));
      setValue("issueImage", file);
    }
    console.log(`e`, e.target.files[0]);
  };

  const onSubmit = async (formData) => {
    try {
      console.log(`formData`, formData);
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      // const res = await createIssue(formData);
      const data = new FormData();

      data.append("title", formData.title);
      data.append("priority", formData.priority);
      data.append("issueType", formData.issueType);
      data.append("description", formData.description);
      data.append("team", formData.team);
      data.append("type", formData.type);
      data.delete("issueImage");
      data.append("dueDate", formData.dueDate);

      data.append("assignedTo", formData.assignedTo);
      if (formData.issueImage) {
        data.append("issueImage", formData.issueImage);
      }
      console.log(`data`, data);
      const res = await createIssue(data);

      if (res.success) {
        toast.success("Issue created successfully");
        // router.push("/dashboard/issues");
      } else {
        toast.error("Failed to create issue");
      }
    } catch (error) {
      toast.error("Failed to create issue");
    } finally {
      // reset();
    }
  };
  const handleDateChange = (date) => {
    console.log(`date`, date);

    setValue("dueDate", date);
  };

  return (
    <div className=" mx-auto max-w-4xl md:mt-8">
      <Heading
        headingTitle="Add Issue"
        size="lg"
        className="mb-5 text-center uppercase"
      />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="relative">
          <Label htmlFor="imageissue">Image</Label>
          <Input
            id="image"
            {...register("image", { required: "Image is required" })}
            type="file"
            accept="image/*"
            className="mt-1 block w-full"
            onChange={handleFileChange}
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
          <div>
            {image && (
              <Avatar
                src={image}
                size="sm"
                alt="my"
                className="absolute right-14 top-8 cursor-pointer"
                onClick={(e) => setShowImgs(image)}
              />
            )}
            {image && (
              <X
                className="w-5 h-5 absolute right-5 top-9 pt-1 text-gray-500 hover:text-gray-600 cursor-pointer"
                onClick={() => {
                  setValue("image", "");
                  setImage(null);
                }}
              />
            )}
          </div>
          {showImgs && (
            <div className="fixed inset-0 w-full h-full z-50 text-center bg-black bg-opacity-50 flex justify-center items-center">
              <div className="relative  ">
                {" "}
                {/* Fixed size container */}
                <SquareX
                  color="white"
                  className="w-5 h-5 text-end absolute right-5 top-5 z-50 cursor-pointer"
                  onClick={() => setShowImgs(null)}
                />
                {image && (
                  <Image
                    width={800}
                    src={image}
                    alt="img"
                    className="object-cover" // Ensure image fills the container
                  />
                )}
              </div>
            </div>
          )}
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            {...register("title", { required: "Title is required" })}
            type="text"
            placeholder="Enter title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>
        <div className="">
          <Label htmlFor="dueDate">Due Date</Label>
          <div>
            <DatePickerWithPresets handleDateChange={handleDateChange} />
          </div>
        </div>
        <div>
          <Label htmlFor="type">Type</Label>
          <select
            {...register("type", { required: "type is required" })}
            id="type"
            className="mt-1 block w-full border rounded-md p-2"
          >
            <option value="">Select Type</option>
            <option value="bug">Bug</option>
            <option value="feature">Feature</option>
            <option value="improvement">Improvement</option>
            <option value="other">Other</option>
          </select>
          {errors.priority && (
            <p className="text-red-500 text-sm mt-1">
              {errors.priority.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="priority">Priority</Label>
          <select
            {...register("priority", { required: "Priority is required" })}
            id="priority"
            className="mt-1 block w-full border rounded-md p-2"
          >
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && (
            <p className="text-red-500 text-sm mt-1">
              {errors.priority.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="issueType">Issue Type</Label>
          <select
            {...register("issueType", { required: "Issue type is required" })}
            id="issueType"
            className="mt-1 block w-full border rounded-md p-2"
            onChange={onIssueTypeChange}
          >
            <option value="">Select Issue Type</option>
            <option value="UI/UX">UI/UX</option>
            <option value="Developer">Developer</option>
            <option value="QA">QA</option>
          </select>
          {errors.issueType && (
            <p className="text-red-500 text-sm mt-1">
              {errors.issueType.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Enter description"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="team">Team</Label>
          <select
            id="team"
            {...register("team", { required: "Team is required" })}
            className="mt-1 block w-full border rounded-md p-2"
            onChange={onTeamChange}
          >
            <option value="">Select Team</option>
            {teams?.map((team) => (
              <option key={team._id} value={team._id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="assignedTo">Assigned To</Label>
          <select
            id="assignedTo"
            {...register("assignedTo", { required: "Assignee is required" })}
            className="mt-1 block w-full border rounded-md p-2"
          >
            <option value="">Select Assignee</option>
            {members?.map((member) => (
              <option key={member._id} value={member._id}>
                {member.firstName} {member.lastName}
              </option>
            ))}
          </select>
          {errors.assignedTo && (
            <p className="text-red-500 text-sm mt-1">
              {errors.assignedTo.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full"
          color="primary"
          disableAnimation
          radius="sm"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Add Issue
        </Button>
      </form>
    </div>
  );
};

export default AddIssueForm;
