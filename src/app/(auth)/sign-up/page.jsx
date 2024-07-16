"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Icons } from "@/components/icons";
import { addUser } from "@/lib/actions/action";
import { toast } from "sonner";

const SignUpPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isLoading },
  } = useForm();
  const onSubmit = async (data) => {
    const user = await addUser(data);

    if (user.error) {
      toast.error(user.error);
    }
    toast.success("Account created successfully");
  };

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Icons.logo className="h-20 w-20" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>

          <Link
            className={buttonVariants({
              variant: "link",
              className: "gap-1.5",
            })}
            href="/sign-in"
          >
            Already have an account? Sign-in
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2 py-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className={cn({
                " ": errors.email,
              })}
              placeholder="you@example.com"
            />
            {errors?.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="grid gap-1 py-2">
            <Label htmlFor="password">Password</Label>
            <Input
              {...register("password", {
                required: "Password is required",
              })}
              type="password"
              className={cn({
                "": errors.password,
              })}
              placeholder="Password"
            />
            {errors?.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit">{isLoading ? "loading..." : `Sign Up`}</Button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
