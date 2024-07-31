"use client";
import React from "react";
import { MdSearch } from "react-icons/md";
import {
  useParams,
  useSearchParams,
  useRouter,
  usePathname,
} from "next/navigation";

const Search = ({ placeholder }) => {
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
    <div className="flex p-2 w-fit items-center  bg-[#3d97ad]  gap-2 rounded-md">
      <MdSearch color="white" />
      <input
        type="search"
        placeholder={placeholder}
        className={` text-white bg-transparent placeholder-slate-200 border-none focus:outline-none`}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
