"use client";
import * as React from "react";
import { Donut } from "./halfdonut";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Avatar } from "@nextui-org/avatar";
import { CircleAlert, CircleCheck } from "lucide-react";
import { Input } from "../ui/input";
import { SearchTabs } from "./searchTabs";

const memberData = [
  {
    _id: {
      $oid: "669e6deef66cf9bed6466676",
    },
    userID: "user_5",
    firstName: "Aakash",
    lastName: "Yadav",
    email: "aakash@gmail.com",
    phoneNumber: "9800084949",
    designation: "Tester",
    profileImg: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/3.png",
    skills: ["react,java"],
    availabilityStatus: "Available",
    tasks: [
      {
        $oid: "669ead0f3393199c022a4390",
      },
    ],
    createdAt: {
      $date: "2024-07-22T14:34:22.722Z",
    },
    updatedAt: {
      $date: "2024-07-22T14:34:22.722Z",
    },
    __v: 0,
    team: "669e6eedf24af312f8c93419",
  },
  {
    _id: {
      $oid: "669e71e47820ac1ac1c4cc56",
    },
    userID: "user_6",
    firstName: "Mrutunjay",
    lastName: "Yadav",
    email: "Mrutunjay@gmail.com",
    phoneNumber: "9800084949",
    designation: "Developer",
    profileImg: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/4.png",
    skills: ["react,java"],
    availabilityStatus: "Available",
    tasks: [
      {
        $oid: "669ead0f3393199c022a4390",
      },
      {
        $oid: "66a3839e6b0f3419f8ec9008",
      },
    ],
    createdAt: {
      $date: "2024-07-22T14:34:22.722Z",
    },
    updatedAt: {
      $date: "2024-07-22T14:34:22.722Z",
    },
    __v: 0,
    team: "669e72d0f24af312f8c9344d",
  },
];

const taskStatusConfig = {
  Open: {
    label: "Open",
    color: "#4285f4",
  },
  Progress: {
    label: "Progress",
    color: "#ffab00",
  },
  Review: {
    label: "Review",
    color: "#34a853",
  },
  Closed: {
    label: "Closed",
    color: "#ff4b4b",
  },
};

const priorityConfig = {
  high: {
    label: "high",
    color: "#ff4b4b",
  },
  medium: {
    label: "medium",
    color: "#ffab00",
  },
  low: {
    label: "low",
    color: "#34a853",
  },
};

export default function HomeCharts({ data }) {
  const teamData = [
    {
      _id: {
        $oid: "669e6a8ef66cf9bed6466632",
      },
      name: "sherrrrrrrrrrr",
      teamleader: {
        $oid: "669e69907820ac1ac1c4cc1f",
      },
      members: [
        {
          $oid: "669fdb924a8ac20c539dc113",
        },
      ],
      TeamRole: "UI/UX",
      description: "sherrrrrrrr ka baaaaaaaaaaaaaaacha",
      createdAt: {
        $date: "2024-07-22T14:19:58.196Z",
      },
      updatedAt: {
        $date: "2024-07-22T14:19:58.196Z",
      },
      __v: 0,
    },
    {
      _id: {
        $oid: "669e6eedf24af312f8c93419",
      },
      name: "dalla",
      teamleader: {
        $oid: "669e6e557820ac1ac1c4cc37",
      },
      members: [
        {
          $oid: "669e6deef66cf9bed6466676",
        },
      ],
      TeamRole: "Tester",
      description: "dalla not found",
      createdAt: {
        $date: "2024-07-22T14:38:37.165Z",
      },
      updatedAt: {
        $date: "2024-07-22T14:38:37.165Z",
      },
      __v: 0,
    },
  ];

  const [tab, setTab] = React.useState("team");

  const taskStatusData = {
    Open: data.StatusOpen || 0,
    Progress: data.StatusProgress || 0,
    Review: data.StatusReview || 0,
    Closed: data.StatusClose || 0,
  };
  const priorityData = {
    high: data.Priority ? data.Priority.high : 0,
    medium: data.Priority ? data.Priority.medium : 0,
    low: data.Priority ? data.Priority.low : 0,
  };
  const handleChangeTab = (tab) => {
    setTab(tab);
  };

  return (
    <div className="flex gap-2">
      <Donut
        data={taskStatusData}
        config={taskStatusConfig}
        title="Task Progress"
        description="This month"
      />
      <Donut
        data={priorityData}
        config={priorityConfig}
        title="Priority Levels"
        description="This month"
      />
      <div className=" w-[300px] ">
        {/* // availble team task and team members search */}

        <div className="">
          <SearchTabs />
        </div>
      </div>
    </div>
  );
}
