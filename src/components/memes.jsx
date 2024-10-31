// MemeCard.js
"use client";
import * as React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const MemeCard = () => {
  const [meme, setMeme] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const fetchMeme = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://meme-api.com/gimme/programmingmemes"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch memes");
      }
      const data = await response.json();
      setMeme(data); // Set the fetched memes to state
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchMeme(); // Initial fetch
  }, []);

  return (
    <Card className="min-h-[700px]">
      <CardHeader className="flex justify-center text-center">
        <span className="text-2xl font-semibold text-center underline mb-10">
          Memes
        </span>
        <CardTitle>{loading ? "Loading..." : meme.title}</CardTitle>
      </CardHeader>
      <CardContent className=" justify-center flex">
        <div className="w-[400px] h-[400px] relative">
          {
            // If loading is true, display a loading message
            loading ? (
              <p className="">Loading...</p>
            ) : (
              <Image
                src={meme.url}
                alt={meme.title}
                fill
                className="rounded  object-contain"
              />
            )
          }
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={fetchMeme} className="bg-[#1f66ff] text-white">
          Fetch New Meme
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MemeCard;
