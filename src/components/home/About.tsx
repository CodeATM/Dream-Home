import Image from "next/image";
import React from "react";
import img from "../../../public/about.jpg";

type Props = {};

const About = (props: Props) => {
  return (
    <>
      <div className="bg-[#f7f7f7]">
        <div className="md:w-[70%] w-[90%] mx-auto py-[6rem]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <h1 className="font-bold leading-tight tracking-wide capitalize text-[2.25rem]">
              Your trusted real <br /> estate advisor.
            </h1>
            <p className="test-md  text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              quia aliquam iure pariatur! Ratione aliquam, maxime reiciendis hic
              eum reprehenderit?
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-200 py-6 px-3 space-y-5 rounded-[15px] align-center cursor-pointer hover:bg-gray-800 ease-in-out duration-300ms hover:text-white">
                    <h1 className="text-2xl font-bold text-[3rem]">5k+</h1>
                    <p className="font-medium  capitalize leading-wide text-[1rem]">Satisfied customer</p>
                </div>
                <div className="bg-gray-200 py-6 px-3 space-y-5 rounded-[15px] align-center cursor-pointer hover:bg-gray-800 ease-in-out duration-300ms hover:text-white">
                    <h1 className="text-2xl font-bold text-[3rem]">25+</h1>
                    <p className="font-medium  capitalize leading-wide text-[1rem]">Years of experience</p>
                </div>
                <div className="bg-gray-200 py-6 px-3 space-y-5 rounded-[15px] align-center cursor-pointer hover:bg-gray-800 ease-in-out duration-300ms hover:text-white">
                    <h1 className="text-2xl font-bold text-[3rem]">17k+</h1>
                    <p className="font-medium capitalize leading-wide text-[1rem]">Properties</p>
                </div>
                <div className="bg-gray-200 py-6 px-3 space-y-5 rounded-[15px] align-center cursor-pointer hover:bg-gray-800 ease-in-out duration-300ms hover:text-white">
                    <h1 className="text-2xl font-bold text-[3rem]">150</h1>
                    <p className="font-medium  capitalize leading-wide text-[1rem]">Awards</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 bg-gray-200 p-7 rounded-[10px]">
                <div className="font-medium capitalize">
                    <p className="">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate repellat illo, corporis suscipit eum autem officiis quibusdam architecto beatae accusantium.</p>

                    <button className=" py-2 px-4 font-bold cursor-pointer bg-black rounded-[5px] mt-6 text-white text-[1.2rem]">Explore</button>
                </div>
                <div className="">
                    <Image src={img} alt="About image" className="rounded-[10px]" />
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
