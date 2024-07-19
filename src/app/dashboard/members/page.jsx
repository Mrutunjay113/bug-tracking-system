// import AddMember from "@/components/Team&Member-Comp/addMember";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

// `app/page.js` is the UI for the `/` URL
export default function Page() {
  return (
    <h1>
      Hello, Member page!
      <Link
        className={buttonVariants({
          variant: "",
          className: "gap-1.5",
        })}
        href="/dashboard/members/add-member"
      >
        add member
      </Link>
    </h1>
  );
}
