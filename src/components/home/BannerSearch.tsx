"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { FaHome } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
type filterProps = {
  onFilter: (filter: { location: string; rooms: Number }) => void;
};

const Search = ({ onFilter }: filterProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [location, setLocation] = useState("");
  const [rooms, setRooms] = useState("");
  const router = useRouter();

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(e.target.value);
    console.log(location);
  };
  const handleRoomsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRooms(e.target.value);
  };

  //   const handleSubmit = async () => {
  //     e.preventDefault();
  //     setSearchValue("");
  //     router.push(`/${searchValue}/`);
  //   };

  return (
    <div className="bg-white py-2 px-3 rounded-md">
      <div className="md:grid md:grid-cols-3 w-full items-center md:justify-center flex justify-between">
        <div className=" md:border-gray-500 border-r-[1.5px] flex gap-[2.5px] items-center px-4 w-full">
          <span className="">
            <MdLocationPin />
          </span>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search for images"
            className={` relative outline-none bg-transparent border-gray-300
           text-gray-800 w-full placeholder:text-semibold placeholder:text-sm text-[0.75rem]
         `}
          />
        </div>
        <div className="px-4 md:flex gap-[2px] items-center hidden">
          <span className="">
            <FaHome />
          </span>
          <label htmlFor="location" defaultValue={rooms}></label>
          <select
            name=""
            id="rooms"
            onChange={(e) => setLocation(e.target.value)}
            value={rooms}
            className="outline-none w-full"
          >
            <option value="3">3 Bedrooms</option>
            <option value="4">4 Bedrooms</option>
            <option value="5">% Bedrooms</option>
          </select>
        </div>
        <div className="">
          <button className="hidden md:block py-2 px-4 rounded-md bg-black text-white w-full">
            Browse Properties
          </button>
          <button className="md:hidden py-2 px-4 rounded-md bg-black text-white w-full">
            {" "}
            <FiSearch />{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
