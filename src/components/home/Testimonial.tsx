"use client";
import Image from "next/image";
import React from "react";
import Avatar from "../../../public/pic-2.png";
import { motion } from "framer-motion";

type Props = {};

const testiomialData: { name: string; testimony: string }[] = [
  {
    name: "Emanuel Bright",
    testimony:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quia aliquam iure pariatur! Ratione aliquam, maxime reiciendis hic eum",
  },
  {
    name: "Bello John",
    testimony:
      "Ratione aliquam, hic eum sit amet consectetur Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quia aliquam iure pariatur!  maxime reiciendis hic eum",
  },
  {
    name: "Oluwafisayomi ayo",
    testimony:
      "maxime reiciendis hic eum sit amet consectetur Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quia aliquam iure pariatur! Ratione aliquam, maxime reiciendis hic eum",
  },
  {
    name: "John Doe",
    testimony:
      "Dolorem quia aliquam iure pariatur! Ratione aliquam, maxime reiciendis hic eum Dolorem quia aliquam iure pariatur! Ratione aliquam, maxime reiciendis hic eum",
  },
];

const Testimonial = (props: Props) => {
  return (
    <>
      <section className="md:w-[70%] w-[90%] mx-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, delay: 0.7 },
          }}
          className="text-center"
        >
          <h1 className="capitalize text-[2.5rem] font-extrabold">
            Don't trust us, trust their voices
          </h1>
          <p className="capitalize mt-2 text-[15px] font-semibold">
            psum dolor sit amet, consectetur adipisicing elit. Ea blanditiis
            facere consectetur adipisicing elit. ad beatae.
          </p>
        </motion.div>
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testiomialData.map((item, index) => (
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.7, delay: 0.9 },
                }}
                key={index}
                className={`bg-[#fbfbfb] p-4 rounded-md shadow ${
                  index === 0 || index === 3
                    ? "col-span-1 md:col-span-2 align-middle items-center "
                    : ""
                }`}
              >
                <div className="-mt-10 ml-3">
                  <Image
                    src={Avatar}
                    alt=""
                    width={50}
                    className="rounded-full"
                  />
                </div>
                <p className="text-gray-600 text-[14px] mt-3">
                  {item.testimony}
                </p>
                <h1 className="text-lg font-bold mt-4 text-[17px]">
                  {item.name}
                </h1>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonial;
