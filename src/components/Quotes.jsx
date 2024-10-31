// QuoteCard.js
"use client";
import * as React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const QuoteCard = () => {
  const quotesApi = {
    jokes1: {
      link: `https://official-joke-api.appspot.com/jokes/programming/random`,
      type: ["programming", "general", "knock-knock", "dad"],
      index: 0,
    },
    jokes2: {
      link: `https://v2.jokeapi.dev/joke/Programming`,
      category: [
        "Programming",
        "Any",
        "Miscellaneous",
        "Pun",
        "Spooky",
        "Christmas",
      ],
      index: 1,
    },
  };

  const [quotes, setQuotes] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [jokesApiIndex, setJokesApiIndex] = React.useState(quotesApi.jokes1);
  const [selectedCategory, setSelectedCategory] = React.useState(
    quotesApi.jokes1.type[0]
  ); // Default category

  const handleChangeQuoteApi = () => {
    setJokesApiIndex((prev) =>
      prev.index === 0 ? quotesApi.jokes2 : quotesApi.jokes1
    );
    setSelectedCategory((prev) =>
      prev === quotesApi.jokes1.type[0]
        ? quotesApi.jokes2.category[0]
        : quotesApi.jokes1.type[0]
    );
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const fetchQuotes = async () => {
    try {
      let api = jokesApiIndex.link;
      api =
        jokesApiIndex.index === 0
          ? `https://official-joke-api.appspot.com/jokes/${
              selectedCategory || jokesApiIndex.type[0]
            }/random`
          : `https://v2.jokeapi.dev/joke/${
              selectedCategory || jokesApiIndex.category[0]
            }`;

      setLoading(true);
      const response = await fetch(api);
      if (!response.ok) {
        throw new Error("Failed to fetch quotes");
      }
      const data = await response.json();
      jokesApiIndex.index === 0 ? setQuotes(data[0]) : setQuotes(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchQuotes(); // Initial fetch
  }, [jokesApiIndex, selectedCategory]);

  return (
    <Card className="min-h-[700px]">
      <CardHeader>
        <span className="text-xl font-semibold text-center underline mb-10">
          Quotes
        </span>
        <CardTitle className="pb-5 uppercase text-lg">
          API: {jokesApiIndex.index === 0 ? "Official Jokes API" : "JokeAPI"}
        </CardTitle>
        <div className="flex items-center gap-4">
          <Select onValueChange={handleCategoryChange} value={selectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {jokesApiIndex.index === 0
                  ? jokesApiIndex.type?.map((category) => (
                      <SelectItem key={category} value={category}>
                        <SelectLabel>{category}</SelectLabel>
                      </SelectItem>
                    ))
                  : jokesApiIndex.category?.map((category) => (
                      <SelectItem key={category} value={category}>
                        <SelectLabel>{category}</SelectLabel>
                      </SelectItem>
                    ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            onClick={handleChangeQuoteApi}
            className="bg-[#1f66ff] text-white w-full"
          >
            Change API
          </Button>
        </div>
      </CardHeader>
      <CardContent className="items-center justify-center p-6">
        {loading ? (
          <div>Loading...</div>
        ) : quotes?.setup ? (
          <div className="text-xl ">
            <span className="text-muted-foreground">Alexa:</span> {quotes.setup}
            <br />
            <span className="text-muted-foreground">Alexa:</span>{" "}
            {quotes.delivery || quotes.punchline}
          </div>
        ) : (
          <span className="text-xl font-semibold">{quotes.joke}</span>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={fetchQuotes} className="bg-[#1f66ff] text-white">
          Fetch New Quote
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuoteCard;
