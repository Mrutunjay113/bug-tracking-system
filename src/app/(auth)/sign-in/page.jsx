"use client";
import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight, Loader } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Icons } from "@/components/icons";
import { signIn } from "@/lib/actions/action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getCookie, getCookies } from "cookies-next";
import { Button } from "@nextui-org/button";

const LoginPage = () => {
  const router = useRouter();

  const {
    handleSubmit,
    register,

    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = async (data) => {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const response = await signIn(data);
    if (response.error === "Invalid credentials") {
      toast.error(response.error);
      return;
    }
    // console.log(`response`, response);

    toast.success("Sign in successful");
    router.push("/dashboard");
  };

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Icons.logo className="h-20 w-20" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Sign in to your account
          </h1>

          <Link
            className={buttonVariants({
              variant: "link",
              className: "gap-1.5",
            })}
            href="/sign-up"
          >
            Don&apos;t have an account?
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
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
                    "": errors.email,
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
                    required: "password is required",
                  })}
                  type="password"
                  className={cn({
                    "": errors.password,
                  })}
                  placeholder="Password"
                />
                {errors?.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                color="primary"
                radius="sm"
                className="mt-4"
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
              >
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
