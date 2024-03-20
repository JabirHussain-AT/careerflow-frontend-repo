import React, { useEffect, useState } from "react";
import Cards from "@/components/company/Home/dashboard/Cards";
import { MdWork } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { MdOutlinePending } from "react-icons/md";
import Charts from "./Charts";
import RecentJobs from "./RecentJobs";
import { useSelector } from "react-redux";
import { IUserSelector } from "@/interface/IUserSlice";
import {
  getTotalJobsAndApplicants,
  getChartData,
  fetchComJobs
} from "@/redux/actions/companyActions";
import { IJob } from "@/interface/IJob";

const CompanyDash: React.FC = () => {
  const { user } = useSelector((state: IUserSelector) => state.user);
  const [countData, setCountData] = useState<any>({});
  const [chartData , setChartData ] = useState<any>([])
  const [ companyJobs , setCompanyJobs ] = useState<IJob[]>([])
  const [filterType, setFilterType] = useState<string>("monthly");


  const handleFilterChange =async (newFilterType: string) => {
    setFilterType(newFilterType);
     const data = await getChartData(user?._id , newFilterType)
     setChartData(data.data)
  };


  useEffect(() => {
    fetchData();
    handleFilterChange(filterType)
  }, [user?._id, filterType]);
  
  const fetchData = async () => {
    try {
      const data = await getTotalJobsAndApplicants(user?._id);
      setCountData(data.data[0]);
      const jobsData = await fetchComJobs(user?._id)
      setCompanyJobs(jobsData.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      return "Good morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  const greeting = getGreeting();


  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-full">
        {/* main section */}
        <div className="flex items-center border-b-2 pb-3 justify-center m-2">
            <span className="text-2xl mr-2">🌞</span>
            <h1 className="text-2xl font-extrabold">
              {greeting}, {user?.userName}!
            </h1>
          </div>
        {/*  cards */}
        <div className="flex gap-4 justify-start flex-wrap mt-4">
          <Cards
            text="Total Jobs Posted"
            icon={MdWork}
            count={countData?.jobCount}
            link={'/company/jobs'}
          />
          <Cards
            text="Total Applicants"
            icon={FaUsers}
            count={countData?.totalApplicants}
            link={'/company/jobs'}
          />
          <Cards text="Interviews" icon={MdOutlinePending} count={3} />
          <Cards
            text="New Applicants"
            icon={MdOutlinePending}
            count={countData?.totalApplicantsInApplyedStage}
            link={'/company/schedules'}
          />
        </div>
        {/* Filter Section */}
        <div className="flex justify-end mt-4 me-5 rounded-lg">
          <label className="mr-2 font-semibold">Filter:</label>
          <select
            className="border p-1"
            onChange={(e) => handleFilterChange(e.target.value)}
            value={filterType}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        {/* LineChart */}
        <div className="flex mt-5 w-full">
          {/* <Charts filterType={filterType} fetchData={getChartData} /> */}
          <Charts chartData={chartData} filterType={filterType} />
        </div>
        <div>
          <RecentJobs jobsData={companyJobs} />
        </div>
      </div>
    </div>
  );
};

export default CompanyDash;
