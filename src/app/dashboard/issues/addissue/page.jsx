"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createIssue } from "@/lib/actions/issue/action";
import { getTeam, getTeamMembers } from "@/lib/actions/team/action";
import { toast } from "sonner";

const AddIssueForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [teams, setTeams] = useState([]);
  const [members, setMembers] = useState([]);

  const fetchTeams = async (TeamRole) => {
    try {
      const response = await getTeam(TeamRole); // Adjust the endpoint as needed
      console.log(response);
      setTeams(response?.team);
      if (response?.team.length > 0) {
        fetchTeamMembers(response?.team[0]._id);
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const fetchTeamMembers = async (teamId) => {
    try {
      const response = await getTeamMembers(teamId); // Adjust the endpoint as needed
      console.log(response);

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
    fetchTeams(issueType);
    setValue("issueType", issueType);
  };

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      console.log(formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const res = await createIssue(formData);
      if (res.success) {
        toast.success("Issue created successfully");
        // router.push("/dashboard/issues");
      } else {
        toast.error("Failed to create issue");
      }

      // console.log(res);
      setLoading(false);
      // router.push("/dashboard/issues");
    } catch (error) {
      console.error("Error creating issue:", error);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-screen-lg mt-8">
      <h1 className="text-2xl font-bold mb-4">Add New Issue</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          <Label htmlFor="image">Image</Label>
          <Input
            id="image"
            {...register("image")}
            type="file"
            className="mt-1 block w-full"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
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
        <div>
          <Button type="submit" className="mt-5 w-full " disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddIssueForm;
