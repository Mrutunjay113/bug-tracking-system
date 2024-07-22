"use client";
import { useForm } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import { getTeamRole } from "@/lib/actions/team/action";
import { toast } from "sonner";
import { createMember } from "@/lib/actions/team/member/action";

const AddMember = () => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Handle form submission

    const formData = new FormData();
    formData.append("userID", data.userID);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("team", data.team || null);
    formData.append("designation", data.designation);
    formData.append("skills", data.skills);
    formData.append("availabilityStatus", data.availabilityStatus);

    if (data.profileImg) {
      formData.append("profileImg", data.profileImg);
    }
    // console.log("FormData", formData);
    const response = createMember(formData);
    if (response.success) {
      toast.success("Member added successfully");
    } else {
      toast.error("Error adding member");
    }
    // Log FormData entries
  };
  const ondesignationChange = async (event) => {
    const desgination = event.target.value;
    const reponse = await fetchTeams(desgination);
  };

  const fetchTeams = async (TeamRole) => {
    try {
      const response = await getTeamRole(TeamRole); // Adjust the endpoint as needed
      console.log(response);
      if (response.success === false) {
        toast.error("No team found");
        setTeamOptions([]);
      }
      if (response?.success) {
        setError("team", {
          message: "",
        });
        setTeamOptions(response?.team);
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePicture(URL.createObjectURL(file));
      setValue("profileImg", file);
    }
  };

  const [profilePicture, setProfilePicture] = useState(null);
  const [projectOptions, setProjectOptions] = useState([]);
  const [teamOptions, setTeamOptions] = useState([]);
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4 uppercase text-center py-4">
        Add New Member
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32">
            <Image
              fill
              src={profilePicture || "/assets/images/user_preview.png"}
              alt="Profile Preview"
              id="profileImg"
              className="w-full h-full object-cover rounded-full border border-gray-300"
            />
            <input
              id="profileImg"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="userID">User ID</Label>
          <Input
            id="userID"
            {...register("userID", { required: "User ID is required" })}
          />
          {errors.userID && (
            <p className="text-red-500">{errors.userID.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            {...register("firstName", { required: "First name is required" })}
          />
          {errors.firstName && (
            <p className="text-red-500">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            {...register("lastName", { required: "Last name is required" })}
          />
          {errors.lastName && (
            <p className="text-red-500">{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            {...register("phoneNumber", {
              required: "Phone number is required",
            })}
          />
          {errors.phoneNumber && (
            <p className="text-red-500">{errors.phoneNumber.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="designation">Designation</Label>
          <select
            id="designation"
            {...register("designation", {
              required: "Designation is required",
            })}
            onChange={ondesignationChange}
            className="p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">Select Designation</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="QA">QA Engineer</option>
            <option value="UI/UX">UI/UX Designer</option>
            <option value="Developer">Developer</option>
            <option value="Tester">Tester</option>
          </select>
          {errors.designation && (
            <p className="text-red-500">{errors.designation.message}</p>
          )}
        </div>
        {teamOptions.length > 0 && (
          <div>
            <Label htmlFor="team">Team</Label>
            <select
              id="team"
              {...register("team")}
              className="p-2 border border-gray-300 rounded-md w-full"
            >
              {teamOptions?.map((team) => (
                <option key={team._id} value={team._id}>
                  {team.name}
                </option>
              ))}
            </select>
            {errors.team && (
              <p className="text-red-500">{errors.team.message}</p>
            )}
          </div>
        )}

        <div>
          <Label htmlFor="skills">Skills</Label>
          <Input
            id="skills"
            {...register("skills", { required: "Skills are required" })}
            placeholder="Comma separated skills"
          />
          {errors.skills && (
            <p className="text-red-500">{errors.skills.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="availabilityStatus">Availability Status</Label>
          <select
            id="availabilityStatus"
            {...register("availabilityStatus", {
              required: "Availability status is required",
            })}
            className="p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">Select Availability Status</option>
            <option value="Available">Available</option>
            <option value="Busy">Busy</option>
            <option value="OnLeave">On Leave</option>
          </select>
          {errors.availabilityStatus && (
            <p className="text-red-500">{errors.availabilityStatus.message}</p>
          )}
        </div>

        <div className="flex justify-end mt-4">
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddMember;
