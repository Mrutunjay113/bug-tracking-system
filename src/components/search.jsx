"use client";
import React, { Suspense } from "react";
import { MdSearch } from "react-icons/md";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const SearchComponent = ({ placeholder }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = (e) => {
    const search = e.target.value;
    const params = new URLSearchParams(searchParams);
    params.set("page", 1);
    if (search) {
      search.length > 2 && params.set("q", search);
      replace(`${pathname}?${params.toString()}`);
    } else {
      params.delete("q");
      params.delete("page");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex p-2 px-4 w-fit items-center bg-[#eaecec] gap-2 rounded-md focus-within:bg-[#dddddd]">
      <MdSearch color="black" />
      <input
        type="search"
        placeholder={placeholder}
        className=" bg-transparent placeholder-slate-800 border-none focus:outline-none "
        onChange={handleSearch}
      />
    </div>
  );
};

const Search = (props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchComponent {...props} />
    </Suspense>
  );
};

export default Search;
