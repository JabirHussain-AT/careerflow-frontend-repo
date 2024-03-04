import React from "react";
import bannerImg from "../../../assets/findJobs.png";

const BannerFindJob: React.FC = () => {
  return (
    <div className="w-full mx-auto px-4 md:px-8 lg:px-16 xl:px-20 h-auto">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
        <div className="w-full md:w-1/2 mt-10 md:mt-20 text-center md:text-left">
          <h5 className="text-3xl md:text-5xl mb-4 md:mb-9 font-sans font-bold">
            Find <span className="text-blue-500">Your</span> Dream <br />
            <span className="text-blue-500 block md:inline-block">Company</span>
          </h5>
          <p className="text-gray-600 font-serif">
            Hand-picked opportunities to work from home, remotely, freelance, <br /> full-time, part-time, contract, and internships.
          </p>
        </div>
        <div className="w-full md:w-1/3 mt-6 md:mt-0">
          <img className="w-full md:w-96 mx-auto" src={bannerImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default BannerFindJob;
