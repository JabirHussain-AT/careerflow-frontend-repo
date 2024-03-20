import { IJob } from "@/interface/IJob";
import { IUserSelector } from "@/interface/IUserSlice";
import { fetchJobs } from "@/redux/actions/companyActions";
import { fetchUser, saveTheJob } from "@/redux/actions/userActions";
import { AppDispatch } from "@/redux/store";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CiSaveUp2 } from "react-icons/ci";
import { toast } from "react-toastify";
import AlertBox from "@/components/common/AlertBox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MySavedJobs: React.FC = () => {


  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: IUserSelector) => state.user);
  const [savedJobs, setSavedJobs] = useState<IJob[]>();
  const [change, setChange] = useState<boolean>(false);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(fetchJobs);
        const userData = await dispatch(fetchUser(user?._id));
        const savedJobs = result?.data.filter((job: IJob) => {
          return userData?.payload?.data?.savedJobs?.includes(job?._id);
        });
        setSavedJobs(savedJobs || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [change]);


  const handleSaveTheJob = async (JobId: string) => {
    
    const res = await dispatch(saveTheJob({userId : user?._id, jobId :  JobId}));
    if (res && res?.payload?.success === true) {
      setChange(!change);
      toast.success(res?.payload?.message, {
        position: "top-center",
        theme: "light",
      });
    }
  };

  return (
    <div className="mx-5 my-5 rounded-2xl">
      <div className="w-full h-screen overflow-auto p-5">
        <div className="mb-8">
          <h1 className="font-bold text-xl font-sans mb-2 text-indigo-800">
            My Saved Jobs
          </h1>
          <p className="text-sm font-semibold text-gray-600">
            Showing {savedJobs && savedJobs.length} results
          </p>
        </div>
        {/* job card section starts from here */}
        {savedJobs && savedJobs.length > 0 ? (
          <div className="w-full flex flex-wrap justify-center my-5">
            {savedJobs &&
              savedJobs.map((job: IJob) => (
                <div
                  key={job._id}
                  className="w-full lg:w-11/12 border rounded-md p-5 lg:flex lg:justify-between mb-5 shadow-md"
                >
                  <div className="lg:w-3/12 flex items-center mb-4 lg:mb-0">
                    <img
                      className="w-12 h-12 object-cover rounded-full"
                      src={
                        (job.companyId && job.companyId.logo) ||
                        "https://th.bing.com/th?id=OIP.QrXqKG_hGsR9qOSODO8m2QHaGw&w=261&h=238&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
                      }
                      alt="logo"
                    />
                  </div>
                  <div className="lg:w-6/12 lg:pl-4 h-16">
                    <h1 className="font-bold text-md font-sans mb-2 text-indigo-800">
                      {job.jobTitle}
                    </h1>
                    <div className="flex text-gray-500 text-sm flex-wrap gap-4">
                      <h1 className="">
                        {job.companyId && job.companyId.userName}
                      </h1>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-2">
                      <p className="font-sans text-center text-xs py-0.5 bg-green-500 text-white rounded px-2 font-semibold">
                        {job.jobType}
                      </p>
                      <p className="font-sans text-center text-xs py-0.5 bg-blue-500 text-white font-semibold px-3 rounded-md">
                        {job.category}
                      </p>
                    </div>
                  </div>
                  <div className="lg:w-3/12 flex items-center justify-end">
                    {
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                          <AlertBox
                              button={
                                <div  className="text-2xl mx-3 mb-3 md:text-3xl cursor-pointer bg-gray-100 p-2 hover:bg-gray-300 rounded-lg ">
                              <CiSaveUp2 />
                            </div>
                              }
                              ques={"Are you sure you remove from the saved jobs?"}
                              onConfirm={() => handleSaveTheJob(job._id!)}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Unsave the Job </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    }

                    <div className="flex flex-col items-center">
                      <button
                        onClick={() => navigate(`/job/${job._id}`)}
                        className="px-4 py-2 mt-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
                      >
                        View Job
                      </button>
                      {/* )} */}
                      <p className="text-gray-500 text-sm mt-2">
                        {job.applicants.length} applications
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="flex flex-col justify-start h-full items-center">
            <p className="text-sm font-semibold font-mono text-gray-600">
              No Saved Jobs Available
            </p>
            <div className="w-16 h-16 text-gray-600 text-4xl mt-2">
              {/* You can use any symbol here */}❌
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MySavedJobs;
