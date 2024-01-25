'use client'
import Image from "next/image";
import React from "react";
import img from "../../../public/about.jpg";
import { FaPlay } from "react-icons/fa";
import { FiChevronRight, FiHome } from "react-icons/fi";
import { motion } from "framer-motion";

type Props = {};

const variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const image = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
    },
  },
};

const Section2 = (props: Props) => {
  return (
      <motion.section
      variants={variants}
      animate = 'show'
      initial = 'hidden'
       className="md:w-[70%] w-[90%] mx-auto">
        <div className="grid grid-cols-1 items-center gap-16 md:gap-1 md:grid-cols-2">
          <motion.div variants={image}
          >
            <Image
              src={img}
              alt="image"
              width={370}
              height={500}
              className="rounded-[.45rem]"
            />
            <div className="hidden absolute px-4 md:flex py-3 gap-1 justify-center items-center top-8 shadow-lg shadow-gray-500/50 bg-white/90 -left-20 backdrop-blur-md rounded-[5px] border-gray-600 border-[.1px]">
              <span className="bg-black/10 rounded-full border-gray-900 border-[.5px]">
                <FaPlay className="m-3" />
              </span>
              <div className="ml-2">
                <h1 className="text-[.9rem] font-bold capitalize">
                  Virtual home Tour
                </h1>
                <hr />
                <p className="text-[.75rem] font-[400]">
                  We provide you with virtual home tour
                </p>
              </div>
            </div>
            <div className="absolute px-4 flex py-3 gap-1 justify-center items-center left-12 -bottom-10 shadow-lg shadow-gray-500/50 bg-white/90  backdrop-blur-md rounded-[5px] border-gray-600 border-[.1px]">
              <div className="ml-2">
                <h1 className="text-[.9rem] font-bold capitalize">
                  Find the best deal
                </h1>
                <hr />
                <p className="text-[.75rem] font-[400]">
                  Browse thousands of properties.
                </p>
              </div>
              <span className="-mt-16 ml-4 bg-black/90 text-white rounded-full border-gray-900 border-[.5px]">
                <FiHome className="m-3" />
              </span>
            </div>
          </motion.div>
          <div className="space-y-6">
            <span className="grid grid-cols-2 items-center bg-white border-gray-600 border-[.1px] w-[18rem] p-[3px] bg-gray-400/20 rounded-md gap-x-2 shadow-md shadow-gray-400">
              <button className="py-4 px-1 text-md font-bold bg-white border-[.5px] border-gray-500 rounded-md capitalize">
                For landlords
              </button>
              <button className="py-4 px-1 text-md font-bold capitalize ">
                For Tenants
              </button>
            </span>

            <div className="space-y-2">
              <h1 className="font-bold text-[1.9rem]">
                We make it easy for <br />
                tenants and landlords.
              </h1>
              <p className="text-[15px]">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse
                qui explicabo et dolore deserunt dolor quam natus impedit,
                aperiam inventore animi sapiente nisi perferendis.
              </p>
            </div>
            <button className="py-2 px-4 font-semibold text-white bg-gray-800 flex gap-3 items-center text-[1.4rem] rounded-[5px]">
              See more
              <span className="">
                <FiChevronRight />
              </span>
            </button>
          </div>
        </div>
      </motion.section>
  );
};

export default Section2;
