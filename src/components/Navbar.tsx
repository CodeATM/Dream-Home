"use client";
import React from "react";
import { useState, useEffect } from "react";
import { FiMenu, FiHome, FiMinusCircle } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";

type Props = {};

const Navbar = (props: Props) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const top = 98;

  const [showBackground, setShowBackground] = useState(false);
  useEffect(() => {
    const handlescroll = () => {
      if (window.scrollY >= top) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handlescroll);

    return () => {
      window.removeEventListener("scroll", handlescroll);
    };
  }, []);

  return (
    <>
      <div
        className={`w-full h-16 py-4 px-3 z-50 fixed transition  duration-500 top-0 ${
          showBackground ? "bg-white text-black shadow" : "text-gray-200"
        }`}
      >
        <div className="w-full md:w-[86%] mx-auto flex justify-between items-center">
          <div
            className={`flex items-center gap-1  ${
              showBackground ? "text-black" : "text-white"
            }`}
          >
            <FiHome className="font-bold text-[1.5rem] " />
            <span className="text-[1rem] font-semibold ">Dream Home</span>
          </div>

          <nav className="md:block hidden">
            <ul className="flex items-center gap-6">
              <li className="text-[1rem] cursor-pointer font-semibold">
                <Link href="">Home</Link>
              </li>
              <li className="text-[1rem] cursor-pointer font-semibold">
                <Link href="">Rent</Link>
              </li>
              <li className="text-[1rem] cursor-pointer font-semibold">
                <Link href="">Buy</Link>
              </li>
              <li className="text-[1rem] cursor-pointer font-semibold">
                <Link href="">Contact us</Link>
              </li>
            </ul>
          </nav>

          <button
            className={`text-black hidden md:block py-2 px-4 rounded-[10px] font-semibold ${
              showBackground
                ? "text-white border-black bg-gray-700"
                : "text-gray-600 bg-white"
            }`}
          >
            <Link href="">Get started</Link>
          </button>

          <div
            className={`menu md:hidden block cursor-pointer ${
              showBackground ? "text-black" : "text-white"
            }`}
          >
            {showMenu ? (
              <AiOutlineClose onClick={() => setShowMenu(false)} />
            ) : (
              <FiMenu onClick={() => setShowMenu(true)} />
            )}
          </div>
        </div>

        <ul className={` bg-white py-[2rem] text-black shadow-lg shadow-gray-400/50 rounded-md ${showMenu? 'flex ' : 'hidden'} flex-col gap-4 text-center mt-8`}>
        <li className="text-[1rem] cursor-pointer font-semibold">
          <Link href="">Home</Link>
        </li>
        <li className="text-[1rem] cursor-pointer font-semibold">
          <Link href="">Rent</Link>
        </li>
        <li className="text-[1rem] cursor-pointer font-semibold">
          <Link href="">Buy</Link>
        </li>
        <li className="text-[1rem] cursor-pointer font-semibold">
          <Link href="">Contact us</Link>
        </li>
      </ul>
      </div>


    </>
  );
};

export default Navbar;
