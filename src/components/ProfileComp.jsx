"use client";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { set } from "mongoose";
import { updateUserById } from "@/lib/actions/user/useraction";

const Profile = ({ user }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: user.username || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      designation: user.designation || "",
      status: user.status || "",
      profileImg: user.image || "",
    },
  });

  const [profilePicture, setProfilePicture] = useState(user?.image || "");
  const [initialValues, setInitialValues] = useState(user); // Store initial values
  const [isChanged, setIsChanged] = useState(false);

  // Track form field values
  const watchedValues = watch();

  useEffect(() => {
    // Set initial values for profile fields
    setValue("username", user.username || "");
    setValue("firstName", user.firstName || "");
    setValue("lastName", user.lastName || "");
    setValue("email", user.email || "");
    setValue("designation", user.designation || "");
    setValue("status", user.status || "");
    setValue("profileImg", user.image || "");

    // Initialize initial values
    setInitialValues({
      username: user.username || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      designation: user.designation || "",
      status: user.status || "",
      profileImg: user.image || "",
    });
  }, [user, setValue]);

  useEffect(() => {
    // Check if form values have changed
    const changed = Object.keys(watchedValues).some(
      (key) => watchedValues[key] !== initialValues[key]
    );
    setIsChanged(changed);
  }, [watchedValues, initialValues]);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePicture(URL.createObjectURL(file));
      setValue("profileImg", file);
    }
  };

  const onSubmit = async (formDatas) => {
    console.log(`fdata`, formDatas);
    const data = initialValues;
    console.log(`data`, data);

    //get changed fields and values
    const changedFields = Object.keys(formDatas).reduce((acc, key) => {
      if (formDatas[key] !== data[key]) {
        acc[key] = formDatas[key];
      }
      return acc;
    }, {});

    try {
      const response = await updateUserById(user._id, changedFields);
      console.log(`response`, response);
      if (response.success) {
        toast.success("Profile updated successfully");
        setInitialValues({ ...initialValues, ...changedFields });
      } else {
        toast.error("Error updating profile");
      }
    } catch (error) {
      console.log(`error`, error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <form className="space-y-3">
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32">
            <Image
              fill
              // src={profilePicture || "/images/profile.png"}
              src="https://d2u8k2ocievbld.cloudfront.net/memojis/female/11.png"
              alt="Profile Preview"
              className="w-full h-full object-cover rounded-full border border-gray-300"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            {...register("username", { required: "Username is required" })}
          />
        </div>

        <div className="">
          <Label htmlFor="firstName ">First Name</Label>
          <Input
            id="firstName"
            placeholder="First Name"
            {...register("firstName", { required: "First Name is required" })}
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Last Name"
            {...register("lastName")}
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="designation">Designation</Label>
          <select
            id="designation"
            {...register("designation")}
            className="p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="Software Engineer">Software Engineer</option>
            <option value="QA">QA Engineer</option>
            <option value="UI/UX">UI/UX Designer</option>
            <option value="Developer">Developer</option>
            <option value="Tester">Tester</option>
          </select>
        </div>

        <div>
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            {...register("status")}
            className="p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="active">Active</option>
            <option value="onleave">On Leave</option>
            <option value="vacation">Vacation</option>
          </select>
        </div>

        {isChanged && (
          <div className="">
            <Button
              type="button"
              color="primary"
              radius="sm"
              size="md"
              onClick={handleSubmit(onSubmit)}
              isLoading={isSubmitting}
              className="w-full mt-4"
            >
              {isSubmitting ? "Updating..." : "Update"}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Profile;
