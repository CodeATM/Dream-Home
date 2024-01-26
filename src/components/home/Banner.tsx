"use client";
import React from "react";
import Search from "./BannerSearch";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <>
      <main className="">
        <div className="background h-[65vh]">
          <div className="h-[100%] bg flex justify-center items-center p-4 flex-col">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              whileInView={{
                y: 0,
                opacity: 1,
                transition: { duration: 0.6, delay: 0.7 },
              }}
              className="font-semibold leading-wide text-[2.4rem] capitalize text-white text-center"
            >
              Journey To your perfect home
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              whileInView={{
                y: 0,
                opacity: 1,
                transition: { duration: 0.6, delay: 0.7 },
              }}
              className="mt-2 text-md font-semibold text-white leading-wide text-center px-5 md:px-10"
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Repudiandae id dicta quae ad consectetur culpa aliquid odit?
              Architecto, impedit optio?
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{
                y: 0,
                opacity: 1,
                transition: { duration: 0.6, delay: 0.7 },
              }}
              className="mt-8 w-[85vw] md:w-[50vw]"
            >
              <Search />
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Banner;
