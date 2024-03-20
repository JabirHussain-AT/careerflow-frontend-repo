import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BannerImage from "./BannerImage";

const Banner: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = () => {
    // Attach the query parameter to the link and navigate
    navigate(`/ShowJobs/?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className=" h-auto md:h-screen bg-green-200 md:flex md:justify-between md:items-center ">
      <div className="px-12 md:px-44 mb-11">
        <h1 className="text-[40px] mb-4 md:text-[56px] font-sans font-bold">
          Find <span className="text-blue-500"> Jobs </span> That <br />{" "}
          <span className="text-blue-500"> Matches </span> <br /> Your Passion
        </h1>
        <h6 className=" text-sm py-6 text-gray-500 font-serif">
          Hand-picked opportunities to work from home, remotely, freelance,{" "}
          <br />
          full-time, part-time, contract, and internships.
        </h6>
        <div>
          <input
            placeholder=" Seach Job Title . . . "
            className="bg-white px-2 py-1 h-8 rounded-md group w-64"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white py-1 rounded-e-md px-3"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      <BannerImage />
    </div>
  );
};

export default Banner;
