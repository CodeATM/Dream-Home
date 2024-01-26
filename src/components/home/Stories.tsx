"use client";
import Image from "next/image";
import React from "react";
import img from "../../../public/about.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { motion } from "framer-motion";

type Props = {};

const storiesData: { name: string; content: string; time: string }[] = [
  {
    name: "Beauty in paris",
    time: "11",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quia aliquam iure pariatur! Ratione aliquam, maxime reiciendis hic eum",
  },
  {
    name: "Wood peackers",
    time: "13",
    content:
      "Ratione aliquam, hic eum sit amet consectetur Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quia aliquam iure pariatur!  maxime reiciendis hic eum",
  },
  {
    name: "Sunset Beauty",
    time: "4",
    content:
      "maxime reiciendis hic eum sit amet consectetur Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quia aliquam iure pariatur! Ratione aliquam, maxime reiciendis hic eum",
  },
  {
    name: "Home for all",
    time: "10",
    content:
      "Dolorem quia aliquam iure pariatur! Ratione aliquam, maxime reiciendis hic eum Dolorem quia aliquam iure pariatur! Ratione aliquam, maxime reiciendis hic eum",
  },
];

const Stories = (props: Props) => {
  return (
    <>
      <section className="md:w-[70%] w-[90%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.h1
            initial={{ x: -30, opacity: 0 }}
            whileInView={{
              x: 0,
              opacity: 1,
              transition: { duration: 0.5, delay: 0.5 },
            }}
            className="font-bold leading-tight tracking-wide capitalize text-[2.25rem]"
          >
            Discover the latest <br />
            real estate stories{" "}
          </motion.h1>
          <motion.p
            initial={{ x: 30, opacity: 0 }}
            whileInView={{
              x: 0,
              opacity: 1,
              transition: { duration: 0.5, delay: 0.5 },
            }}
            className="test-md  text-gray-500"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            quia aliquam iure pariatur! Ratione aliquam, maxime reiciendis hic
            eum reprehenderit?
          </motion.p>
        </div>

        <div className="mt-8">
          <div className="flex justify-between gap-8">
            <Swiper
              modules={[Pagination, Navigation, Scrollbar]}
              spaceBetween={40}
              slidesPerView={3}
              pagination={{ clickable: true }}
              breakpoints={{
                900: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                400: {
                  slidesPerView: 1,
                },
              }}
            >
              {storiesData.map((item, index) => (
                <SwiperSlide>
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{
                      y: 0,
                      opacity: 1,
                      transition: { duration: 0.6, delay: 0.7 },
                    }}
                    key={index}
                    className="relative cursor-pointer"
                  >
                    <Image src={img} alt="stories" className="rounded-[10px]" />
                    <div className="absolute bottom-3 bg-black/80 right-3 left-3 px-4 py-6 text-white rounded-[10px]">
                      <p className="text-gray-300 capitalize text-sm underline">
                        {item.name}
                      </p>
                      <p className="text-white capitalize mt-4 text-[13px] tracking-tight">
                        {item.content}
                      </p>
                      <p className=" capitalize mt-3 text-semibold text-gray-300">
                        {item.time} hours ago
                      </p>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
};

export default Stories;
