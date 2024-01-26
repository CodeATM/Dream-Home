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
            <motion.h1 initial = {{x: -30, opacity: 0}}
               whileInView={{
                x: 0,
                opacity: 1,
                transition: {duration: 0.5, delay: 0.5}
               }}
               className="font-bold leading-tight tracking-wide capitalize text-[2.25rem]">
              Discover your perfect <br /> property match
            </motion.h1>
            <motion.p initial = {{x: 30, opacity: 0}}
               whileInView={{
                x: 0,
                opacity: 1,
                transition: {duration: 0.5, delay: 0.5}
               }}
               className="test-md  text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              quia aliquam iure pariatur! Ratione aliquam, maxime reiciendis hic
              eum reprehenderit?
            </motion.p>
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
