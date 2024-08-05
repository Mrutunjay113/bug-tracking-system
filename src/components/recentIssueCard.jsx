import { getIssuesBYRecent } from "@/lib/actions/issue/action";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { CalendarPlus, Flag } from "lucide-react";
import { toast } from "sonner";
import { ScrollArea } from "./ui/scroll-area";
import Link from "next/link";

export const RecentIssueCard = async () => {
  const response = await getIssuesBYRecent();
  if (!response.success) {
    return toast.error(response.error);
  }
  const data = response.issues;
  return (
    <Card shadow className="p-2 rounded-sm">
      <CardHeader className="">
        <h1 className="font-semibold text-blue-600"> Recent Activities</h1>
      </CardHeader>

      <ScrollArea className="max-h-[300px] ">
        <CardBody className="rounded-md gap-y-2">
          {data &&
            data.map((issue) => (
              <Link
                href={`/dashboard/issues/${issue._id}`}
                key={issue._id}
                className=" items-center justify-between p-2 rounded-md bg-blue-50
                hover:bg-blue-200  "
              >
                <div className="font-semibold ">{issue.title}</div>

                <div className="flex items-center">
                  <p className="text-muted-foreground">
                    {issue.type} | {issue.priority} |{" "}
                    {new Date(issue.dueDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </Link>
            ))}
        </CardBody>
      </ScrollArea>
    </Card>
  );
};
