import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPrefferedJobs } from '../../../redux/actions/userActions';
import { IUserSelector } from "@/interface/IUserSlice";
import { AppDispatch } from "@/redux/store";
import { useNavigate } from 'react-router-dom'
import { faArrowRight, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleIcon from "../../../assets/googleIcon.png";

const FeaturedJobSec: React.FC = () => {
  const { user, error } = useSelector((state: IUserSelector) => state.user);
  const [preferredJobs, setPreferredJobs] = useState<any[]>([]); // Change the type if needed
  const [visibleJobs, setVisibleJobs] = useState<number>(4);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchPreferredJobs = async () => {
      if (user && user.preferredJobs) {
        const queryParams = user.preferredJobs.join(',');
        const data = await dispatch(getPrefferedJobs({ prefferedJobs: queryParams, currentPage }));
        setPreferredJobs(data.payload.data);
      }
    };

    fetchPreferredJobs();
  }, [user, currentPage]);

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
    setVisibleJobs((prev) => prev + 6);
  };

  return (
    <div className="min-h-auto bg-white" >
      <div className="flex justify-between items-center py-5 px-4 bg-white" >
        <h3 className="font-bold font-sans text-3xl">
          Suggested  <span className="text-blue-500"> Jobs </span>
        </h3>
        <div className="text-blue-600 font-medium">
          View All <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
        </div>
      </div>

      {preferredJobs?.length > 0 ? (
        <div className="flex flex-wrap justify-start p-4">
          {preferredJobs?.slice(0, visibleJobs).map((job, index) => (
            <div key={index} onClick={()=>navigate(`/job/${job._id}`)} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
              <div className="h-full borde cursor-pointer  p-4">
                {/* Job Details */}
                <p className="font-semibold text-sm py-1 font-sans">{job.jobTitle}</p>
                <div className="flex justify-start items-center">
                  <div className="flex items-center h-5 p-1 mb-1 rounded w-20 text-center">
                    <p className="text-green-500 bg-gray-300 px-1 font-semibold text-xs">
                      INTERNSHIP
                    </p>
                  </div>
                  <p className="ml-2 text-xs text-gray-400">Salary: $20,000 - $25,000</p>
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
                  <FontAwesomeIcon icon={faBookmark} className="text-gray-500 cursor-pointer" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 text-center">
          <p className="text-gray-500">No preferences added. Add preferences from your profile.</p>
        </div>
      )}

      {visibleJobs < preferredJobs?.length && (
        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out hover:bg-blue-600"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default FeaturedJobSec;
