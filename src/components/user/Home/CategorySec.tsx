import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import designLogo from "../../../assets/design.png";

const CategorySec: React.FC = () => {
  return (
    <>
      <div className="h-auto w-full bg-white">
        <div className="flex justify-between py-5 px-4  bg-white">
          <div className="">
            <h3 className="font-bold font-sans text-3xl">
              Explore By <span className="text-blue-500"> Category </span>{" "}
            </h3>
          </div>
          <div>
            <h4 className="text-blue-600 font-medium">
              Show all Jobs{" "}
              <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </h4>
          </div>
        </div>
        {/* It category section */}
        <div className="w-full bg-white ">
          <div className="w-40 rounded h-32 ml-8 border hover:bg-blue-500 group  border-black">
            <img className="h-12 p-1" src={designLogo} alt="" />
            <h4 className=" font-bold px-2">Engineering </h4>
            <p className="text-gray-500 font-serif py-3 px-2 text-sm group-hover:text-white">
              244 Jobs available{" "}
              <FontAwesomeIcon
                icon={faArrowRight}
                className="ml-2 text-gray-500 group-hover:text-white"
              />{" "}
            </p>
          </div>
        </div>
        {/*  */}

        {/* to make loop over here */}
      </div>
    </>
  );
};

export default CategorySec;
