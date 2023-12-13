"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import qs from "query-string";
import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
const Search = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue) return;
    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: { term: inputValue },
      },
      { skipEmptyString: true }
    );
    router.push(url);
  };
  const onClear = () => {
    setInputValue("");
  };
  return (
    <form
      onSubmit={onSubmit}
      className="relative w-full lg:w-[400px] flex items-center"
    >
      <Input
        placeholder="search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="rounded-l-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
      />
      {inputValue && (
        <X
          onClick={onClear}
          className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
        />
      )}
      <Button
        type="submit"
        size="sm"
        variant="secondary"
        className="rounded-l-none"
      >
        <SearchIcon className="h-5 w-5 text-muted-foreground" />
      </Button>
    </form>
  );
};

export default Search;
