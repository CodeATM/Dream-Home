"use client";
import React from "react";
import { motion } from "framer-motion";

type Props = {};

const Cta = (props: Props) => {
  return (
    <>
      <section className="bg-gray-950 py-12">
        <div className="md:container">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{
              y: 0,
              opacity: 1,
              transition: { duration: 0.6, delay: 0.7 },
            }}
            className="justify-center flex flex-col text-white items-center gap-4"
          >
            <p className="capitalize text-gray-400 font-semibold tracking-wide text-[17px]">
              No Unnecessary Delays
            </p>
            <h1 className="capitalize text-[2rem] text-white tracking-wide font-bold text-center">
              Are you a Real Estate Entutiast?
            </h1>
            <p className="capitalize text-gray-300 font-semibold tracking-wide text-[17px] text-center">
              Discover the easiest way to buy and sell properties
            </p>
            <div className=" bg-white py-2 px-3 rounded-[5px]">
              <input
                type="text"
                placeholder="Subscribe to Newsletter"
                className="outline-none placeholder:text-black placeholder:text-sm p-2 text-black text-[15px]"
              />
              <button className=" py-2 px-4 font-bold cursor-pointer bg-black rounded-[5px] ml-2">
                Subscribe
              </button>
            </div>
            <p className="capitalize text-gray-300 tracking-wide text-[15px]">
              Join the <span className="font-semibold text-white">1000+</span>{" "}
              to enjoy affordable housing
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Cta;
