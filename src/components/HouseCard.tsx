"use client";
import React from "react";
import img1 from "../../public/about.jpg";
import img2 from "../../public/1.jpg";
import img3 from "../../public/2.jpg";
import Image from "next/image";
import { FiArrowRight, FiHeart } from "react-icons/fi";
import { FaBath, FaBed, FaSquarespace } from "react-icons/fa";
import { motion } from "framer-motion";

type Props = {};

const houseData: {
  address: string;
  price: string;
  feets: string;
  bed: string;
  bath: string;
  name: string;
}[] = [
  {
    name: "Horizon home",
    address: "1, ibitoye street, jackson Avenue Ikoyi Lagos",
    price: "180,000",
    feets: "17,300",
    bed: "2",
    bath: "1",
  },
  {
    name: "Beautiful house",
    address: "2, lanre street, Lekki Lagos",
    price: "600,000",
    feets: "53,300",
    bed: "5",
    bath: "3",
  },
  {
    name: "Light house",
    address: "10, Berry street, Gwagalada Abuja",
    price: "150,000",
    feets: "10,300",
    bed: "2",
    bath: "2",
  },
  {
    name: "Splendor Rest",
    address: "16, ibitoye street, bademi Ikeja Lagos",
    price: "410,000",
    feets: "43,300",
    bed: "3",
    bath: "2",
  },
  {
    name: "Spring Fields",
    address: "12c, bolude, jackson Avenue ibadan",
    price: "250,000",
    feets: "13,300",
    bed: "4",
    bath: "2",
  },
  {
    name: "Lake side",
    address: "13, ibitoye street, Matthes Avenue Gbagada Lagos",
    price: "500,000",
    feets: "23,300",
    bed: "2",
    bath: "1",
  },
];

const HouseCard = (props: Props) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {houseData.map((item, index) => (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{
              y: 0,
              opacity: 1,
              transition: { duration: 0.7, delay: 0.9 },
            }}
            className="bg-white rounded-[10px] cursor-pointer border-[.5px] border-gray-200 "
            key={index}
          >
            <Image src={img3} alt="home image " className="rounded-t-[10px]" />
            <div className="px-6 pt-6 pb-4">
              <div className="flex justify-between items-center">
                <h1 className="font-bold text-gray-700 text-[1.5rem]">
                  ${item.price}
                </h1>

                <div className="rounded-full border-[1px] border-gray-300 cursor-pointer">
                  <FiHeart className="m-3 text-[18px]" />
                </div>
              </div>
              <div className="space-y-3">
                <h1 className="font-bold text-[2rem] md:text-[1.5rem] tracking-wide capitalize">
                  {item.name}
                </h1>
                <p className="text-gray-500 md:text-[1rem] text-xl tracking-wide md:tracking-normal capitalize">
                  {item.address}
                </p>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between items-center">
                <div className="flex space-x-2 items-center text-[1.2rem] md:text-[.85rem] font-medium">
                  <FaBed className="text-[1.3rem]" />{" "}
                  <span className="text-gray-600">{item.bed} Beds</span>
                </div>
                <div className="flex space-x-2 items-center text-[1.2rem] md:text-[.85rem] font-medium">
                  <FaBath className="text-[1.3rem]" />{" "}
                  <span className="text-gray-600">{item.bath} Bath</span>
                </div>
                <div className="flex space-x-2 items-center text-[1.2rem] md:text-[.85rem] font-medium">
                  <FaSquarespace className="text-[1.3rem]" />{" "}
                  <span className="text-gray-600">{item.feets} ft</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default HouseCard;
