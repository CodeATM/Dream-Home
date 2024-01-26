"use client";
import React from "react";
import { FiHome } from "react-icons/fi";
import Links from "./Links";
import { motion } from "framer-motion";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="pt-24 pb-12 md:w-[70%] w-[90%] mx-auto">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{
          y: 0,
          opacity: 1,
          transition: { duration: 0.6, delay: 0.7 },
        }}
        className="flex flex-col md:flex-row w-full px-6 md:container gap-4"
      >
        <div className="logo md:w-[30%] w-full">
          {" "}
          <h1 className="flex gap-2 font-semibold text-xl items-center">
            <span className="font-bold">
              <FiHome />
            </span>
            Dream Home
          </h1>
        </div>

        <div className="grid md:grid-cols-3 gap-5 w-[70%] grid-cols-1">
          <div className="w-full">
            <h1 className="uppercase text-black mb-2 font-bold">Sell a home</h1>
            <ul className="capitalize font-[400] text-[15px] space-y-1">
              <li className=" cursor-pointer">Request an offer</li>
              <li className=" cursor-pointer">Pricing</li>
              <li className=" cursor-pointer">Review</li>
              <li className=" cursor-pointer">Stories</li>
            </ul>
          </div>
          <div className="">
            <h1 className="uppercase text-black mb-2 font-bold">
              buy, rent and sell
            </h1>
            <ul className="capitalize font-[400] text-[15px] space-y-1">
              <li className=" cursor-pointer">buy and rent properties</li>
              <li className=" cursor-pointer">rent home</li>
              <li className=" cursor-pointer">builder trade-up</li>
            </ul>
          </div>
          <div className="">
            <h1 className="uppercase text-black mb-2 font-bold">About</h1>
            <ul className="capitalize font-[400] text-[15px] space-y-1">
              <li className=" cursor-pointer">Company</li>
              <li className=" cursor-pointer">how it works</li>
              <li className=" cursor-pointer">conact</li>
              <li className=" cursor-pointer">investors</li>
            </ul>
          </div>
          <div className="">
            <h1 className="uppercase text-black mb-2 font-bold">Buy a home</h1>
            <ul className="capitalize font-[400] text-[15px] space-y-1">
              <li className=" cursor-pointer">buy</li>
              <li className=" cursor-pointer">fince</li>
            </ul>
          </div>
          <div className="">
            <h1 className="uppercase text-black mb-2 font-bold">
              terms & condition
            </h1>
            <ul className="capitalize font-[400] text-[15px] space-y-1">
              <li className=" cursor-pointer">Trust & safty</li>
              <li className=" cursor-pointer">Terms & condition</li>
              <li className=" cursor-pointer">Privacy policy</li>
            </ul>
          </div>
          <div className="">
            <h1 className="uppercase text-black mb-2 font-bold">Resources</h1>
            <ul className="capitalize font-[400] text-[15px] space-y-1">
              <li className=" cursor-pointer">blog</li>
              <li className=" cursor-pointer">guide</li>
              <li className=" cursor-pointeruppercase">FAQ</li>
              <li className=" cursor-pointer">Help center</li>
            </ul>
          </div>
        </div>
      </motion.div>
      <hr className="w-[95%] mt-6 mx-auto text-gray-800" />

      <Links />

      {/* <hr className='w-[95%] mt-6 mx-auto text-gray-800'/>

        <Links/> */}
    </footer>
  );
};

export default Footer;
