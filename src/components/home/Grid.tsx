"use client";
import React from "react";
import HouseCard from "../HouseCard";
import { motion } from "framer-motion";

type Props = {};


const Grid = (props: Props) => {
  return (
    <>
      <div className="bg-[#f7f7f7]">
        <div className="md:w-[70%] w-[90%] mx-auto py-[6rem]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <h1 className="font-bold leading-tight tracking-wide capitalize text-[2.25rem]">
              Discover your perfect <br /> property match
            </h1>
            <p className="test-md  text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              quia aliquam iure pariatur! Ratione aliquam, maxime reiciendis hic
              eum reprehenderit?
            </p>
          </div>
          <div className="product mt-8">
            <HouseCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Grid;
