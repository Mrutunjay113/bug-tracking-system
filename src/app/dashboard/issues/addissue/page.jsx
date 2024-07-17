// components/AddIssueForm.js
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

// import { createIssue } from "@/lib/api";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createIssue } from "@/lib/actions/issue/action";

const formdata = {
  title: "title",
  description: "description",
  priority: "low",
  image: "image",
  status: "Open",
  assignedTo: "6696d01bdd5ca68660e2dadb",
  assignedBy: "6696d01bdd5ca68660e2dadb",
};

const AddIssueForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      console.log(formData);
      // Add additional logic here to handle form data submission, such as API calls
      // For now, we assume a function `createIssue` is used to create an issue
      const res = await createIssue(formdata);
      console.log(res);
      setLoading(false);
      //   router.push("/dashboard/issues"); // Redirect to issues page after successful submission
    } catch (error) {
      console.error("Error creating issue:", error);
      setLoading(false);
      // Handle error state, e.g., show error message to user
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

        <div className="mb-4">
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-gray-700"
          >
            Priority
          </label>
          <select
            {...register("priority")}
            id="priority"
            className="mt-1 block w-fit border rounded-md p-1"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {errors.priority && (
          <p className="text-red-500 text-sm mt-1">{errors.priority.message}</p>
        )}

        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image
          </label>
          <Input
            {...register("image")}
            type="file"
            id="image"
            className="mt-1 block w-full"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="assignedTo">Assigned To</Label>
          <Input
            id="assignedTo"
            {...register("assignedTo", {
              required: "Assign to is required",
            })}
            type="text"
            placeholder="Enter assignee's name"
          />
          {errors.assignedTo && (
            <p className="text-red-500 text-sm mt-1">
              {errors.assignedTo.message}
            </p>
          )}
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default AddIssueForm;
