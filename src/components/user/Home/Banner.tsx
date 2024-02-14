import React from "react";
import BannerImage from "./BannerImage";

const Banner: React.FC = () => {
  return (
    <div className="flex justify-between items-center h-screen bg-green-100">
      <div className=" px-44 mb-11">
        <h1 className="text-5xl font-sans   font-bold">
          Find <span className="text-blue-500"> Jobs </span> That <br />{" "}
          <span className="text-blue-500"> Matches </span> <br /> Your Passion
        </h1>
        <h6 className=" text-sm py-3 text-gray-500 font-serif ">
          Hand-picked opportunities to work from home, remotely, freelance,{" "}
          <br />
          full-time, part-time, contract and internships.
        </h6>
        <div>
          <input
            placeholder=""
            className="bg-white h-8 rounded-md group w-64"
            type="text"
          />
          <button className=" bg-blue-500 text-white py-1 rounded-e-md  px-3">
            Search
          </button>
        </div>
      </div>
      <BannerImage />
    </div>
  );
};

export default Banner;
