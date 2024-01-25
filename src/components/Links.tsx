import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FiFacebook, FiGithub, FiTwitter } from "react-icons/fi";

type Props = {};

const Links = (props: Props) => {
  return (
    <>
      <div className="mt-5">
        <div className="flex flex-col md:flex-row justify-center md:justify-between gap-4 text-center">
          <p className="">@2021 Dream Home. All rights reservered</p>
          <div className="flex gap-3 justify-center">
            <a href="" className="text-gray-700 text-[20px]">
              <FiFacebook />
            </a>
            <a href="" className="text-gray-700 text-[20px]">
              <FaLinkedin />
            </a>
            <a href="" className="text-gray-700 text-[20px]">
              <FiGithub />
            </a>
            <a href="" className="text-gray-700 text-[20px]">
              <FiTwitter />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Links;
