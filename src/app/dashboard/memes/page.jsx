"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MemeCard from "@/components/memes";
import QuoteCard from "@/components/Quotes";

export default function Page() {
  return (
    <main className="w-full">
      <div className="bg-[#F6F6F6] border-b border-gray-400 margin-5 py-10">
        <Heading
          headingTitle="Memes & quotes"
          size="lg"
          className="text-gray-800 uppercase tracking-wide md:ml-10 ml-4"
        />
      </div>
      <div className="p-1 w-full flex">
        <div className="w-1/2 h-full">
          <MemeCard />
        </div>
        <div className="w-1/2 ">
          <QuoteCard />
        </div>
      </div>
    </main>
  );
}
