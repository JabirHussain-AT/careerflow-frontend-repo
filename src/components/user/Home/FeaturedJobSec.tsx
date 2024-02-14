import { faArrowRight, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleIcon from "../../../assets/googleIcon.png";
import React from "react";

const FeaturedJobSec: React.FC = () => {
  return (
    <div className="min-h-auto bg-white">
      <div className="flex justify-between items-center py-5 px-4 bg-white">
        <h3 className="font-bold font-sans text-3xl">
          Featured <span className="text-blue-500"> Jobs </span>
        </h3>
        <div className="text-blue-600 font-medium">
          View All <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
        </div>
      </div>

      <div className="flex flex-wrap justify-start p-4">
        <div className="w-full  sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
          <div className="h-full border p-4">
            {/* Job Details */}
            <p className="font-semibold text-sm py-1 font-sans">
              Junior Graphic Designer
            </p>
            <div className="flex justify-start items-center">
              <div className="flex items-center h-5 p-1 mb-1 rounded w-20 text-center">
                <p className="text-green-500 bg-gray-300 px-1 font-semibold text-xs">
                  INTERNSHIP
                </p>
              </div>
              <p className="ml-2 text-xs text-gray-400">
                Salary: $20,000 - $25,000
              </p>
            </div>
            {/* Company Details */}
            <div className="flex items-center mt-2">
              <div className="h-6 w-6 py-2">
                <img src={GoogleIcon} alt="g-Icon" />
              </div>
              <div className="ml-2">
                <p className="font-sans">Google Inc.</p>
                <p className="text-sm text-gray-400">Dhaka, Bangladesh</p>
              </div>
            </div>
            {/* Save Icon */}
            <div className="text-right mt-2">
              <FontAwesomeIcon
                icon={faBookmark}
                className="text-gray-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedJobSec;
