import React from "react";
import { FaTasks, FaCalendarAlt } from "react-icons/fa";
import { CiSaveDown2 } from "react-icons/ci";

const MiniDash: React.FC = () => {
  const noApplications = 0;
  const noInterviewsScheduled = 0;

  return (
    <div className="bg-gradient-to-b from-gray-200 to-orange-100 text-white p-5 w-full rounded-lg gap-2  md:gap-0  flex items-center justify-between">
      {" "}
      {/* No Applications */}
      <div className="bg-blue-600 h-24 w-32 p-4 rounded shadow-md text-start">
        <FaTasks className="text-2xl" />
        <span className="font-bold text-xs ">Applications : 0 </span>
      </div>
      {/* No Interviews Scheduled */}
      <div className="bg-green-600 h-24 w-32 p-4 rounded shadow-md text-start">
        <FaCalendarAlt className="text-2xl" />
        <span className="text-xs font-bold  mb-2">
          Interviews Scheduled: {noInterviewsScheduled}
        </span>
      </div>
      {/* No Saved Jobs */}
      <div className="bg-yellow-600 h-24 w-24 p-4 rounded shadow-md text-start">
        <CiSaveDown2 className="text-2xl font-bold" />
        <span className="text-xs font-bold  mb-2">Saved Jobs: 21</span>
      </div>
      {/* Another Section (if needed) */}
      {/* <div className="bg-white w-24 p-4 rounded shadow-md text-center">
        <span className="text-xs font-semibold block mb-2">Another Section</span>
        <!-- Add your content here -->
      </div> */}
      {/* Progress Bar */}
      <div className="flex items-center">
        {/* Add your progress bar component here */}
      </div>
      <div>
      </div>
    </div>
  );
};

export default MiniDash;
