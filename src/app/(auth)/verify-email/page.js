import VerifyEmail from "@/components/VerifyEmail";
import { sendVerificationEmail } from "@/lib/actions/action";
import { decode } from "next-auth/jwt";
import Image from "next/image";

const Page = async ({ searchParams }) => {
  const token = searchParams.token;
  const toEmail = searchParams.to;
  // const decoded = await decode({
  //   token,
  //   secret: process.env.NEXTAUTH_SECRET,
  // });
  // console.log(`decoded`, decoded);
  // const response = await sendVerificationEmail(toEmail, token);
  // console.log(`response`, response);

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w[350px]">
        {/* {token && typeof token === "string" ? (
          <div className="grid gap-6">
            <VerifyEmail token={token} />
          </div>
        ) : ( */}
        <div className="flex h-full flex-col items-center justify-center space-y-4">
          <div className="relative mb-4 h-60 w-60 text-muted-foreground">
            <Image
              src="/assets/images/hippo-email-sent.png"
              fill
              alt="hippo email sent image"
            />
          </div>
          <h3 className="font-semibold text-2xl">Check your email</h3>
          {toEmail ? (
            <p className="text-muted-foreground text-center">
              We&apos;ve sent an email to
              <span className="font-semibold"> {toEmail}</span>.
            </p>
          ) : (
            <p>We&apos;ve sent a verification link to your email.</p>
          )}
        </div>
        {/* )} */}
      </div>
    </div>
  );
};
export default Page;
