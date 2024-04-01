import React, { useEffect, useState } from "react";
import { FaTasks, FaCalendarAlt } from "react-icons/fa";
import { CiSaveDown2 } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchUser, getUserApplications } from "@/redux/actions/userActions";
import { IUserSelector } from "@/interface/IUserSlice";
import { fetchJobs } from "@/redux/actions/companyActions";
import { IJob } from "@/interface/IJob";

const MiniDash: React.FC = () => {
  const [noApplication, setNoofApplications] = useState(0);
  const [savedJobs, setSavedJobs] = useState(0);
  const [Interviews, setTotalInterviews] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: IUserSelector) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getUserApplications(user._id));
        const userDataFromServer = response.payload.data;
        setNoofApplications(userDataFromServer.length);

         // Filter job applications based on the presence of schedule in applicants
         const filteredApplications = userDataFromServer.filter((job: any) => {
          return job.applicants.some((applicant: any) => applicant.schedule);
        });
        setTotalInterviews(filteredApplications.length);

      } catch (error) {
        console.error("Error fetching user applications:", error);
      }
    };

    fetchData();
  }, []);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(fetchJobs);
        const userData = await dispatch(fetchUser(user?._id));
        const savedJobs = result?.data.filter((job: IJob) => {
          return userData?.payload?.data?.savedJobs?.includes(job?._id);
        });
        setSavedJobs(savedJobs.length || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user?._id]);



  return (
    <div className="bg-gradient-to-b from-gray-200 to-orange-100 text-white p-5 w-full rounded-lg gap-2  md:gap-0  flex items-center justify-between">
      {" "}
      {/* No Applications */}
      <div className="bg-blue-600 h-24 md:w-32 w-36  p-4 rounded shadow-md text-start">
        <FaTasks className="text-2xl" />
        <span className="font-bold text-xs ">
          Applications : {noApplication}{" "}
        </span>
      </div>
      {/* No Interviews Scheduled */}
      <div className="bg-green-600 h-24 md:w-32 w-36 p-4 rounded shadow-md text-start">
        <FaCalendarAlt className="text-2xl" />
        <span className="text-xs font-bold  mb-2">
          Interviews Scheduled: {Interviews}
        </span>
      </div>
      {/* No Saved Jobs */}
      <div className="bg-yellow-600 md:h-24 md:w-24 w:32 p-4 rounded shadow-md text-start">
        <CiSaveDown2 className="text-2xl font-bold" />
        <span className="text-xs font-bold  mb-2">Saved Jobs: {savedJobs}</span>
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
      <div></div>
    </div>
  );
};

export default MiniDash;
