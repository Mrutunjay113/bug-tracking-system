"use client";
import { Loader2, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { decode } from "next-auth/jwt";

export default function VerifyEmail({ token }) {
  //   const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
  //     token,
  //   });

  const data = { success: true };
  const isLoading = false;
  const isError = false;
  if (isError) {
    return (
      <div className="flex flex-col items-center gap-2">
        <XCircle className="h-8 w-8 text-red-500" />
        <h3 className="font-semibold text-xl">There was a problem</h3>
        <p className="text-muted-foreground text-center">
          This Token is invalid or has expired. Please try again.
        </p>
      </div>
    );
  }
  if (data?.success) {
    return (
      <div className="flex flex-col items-center h-full justify-center ">
        <div className="relative mb-4 h-60 w-60 text-muted-foreground">
          <Image
            src="/assets/images/hippo-email-sent.png"
            fill
            alt="hippo email verified image"
          />
        </div>
        <h3 className="font-semibold text-2xl">You&apos;re all set!</h3>
        <p className="text-muted-foreground text-center">
          Your email has been verified. You can now login to your account.
        </p>
        <Link className={buttonVariants({ className: "mt-4" })} href="/sign-in">
          Sign in
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
        <h3 className="font-semibold text-xl">Verifying...</h3>
        <p className="text-muted-foreground text-center">
          This wont take long. Please wait.
        </p>
      </div>
    );
  }
}
