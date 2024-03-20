import { IJob } from "@/interface/IJob";
import React from "react";
import { useNavigate } from "react-router-dom";

const AllJobs: React.FC<{ filteredData: IJob[]; userId: string }> = ({
  filteredData,
  userId,
}) => {
  const totalJobs = filteredData.length;
  const navigate = useNavigate();

  return (
    <div className="mx-5 my-5 rounded-2xl">
      <div className="w-full h-screen overflow-auto p-5">
        <div className="mb-8">
          <h1 className="font-bold text-xl font-sans mb-2 text-indigo-800">
            All Jobs
          </h1>
          <p className="text-sm font-semibold text-gray-600">
            Showing {totalJobs} results
          </p>
        </div>
        {/* job card section starts from here */}
        {totalJobs > 0 ? (
          <div className="w-full flex flex-wrap justify-center my-5">
            {filteredData.map((job) => (
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
                    <h1 className="">{job.companyId && job.companyId.userName}</h1>
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
                  <div className="flex flex-col items-center">
                    {/* {job.applicants.some((applicant :any ) => applicant.applicantId === userId) ? (
                      <button className="px-4 py-2 mt-2 bg-gray-400 text-white rounded-md cursor-not-allowed" disabled>
                        Applied
                      </button>
                    ) : ( */}
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
          <div className="flex flex-col justify-center h-full items-center">
            <p className="text-sm font-semibold text-gray-600">No jobs available</p>
            <div className="w-16 h-16 text-gray-600 text-4xl mt-2">
              {/* You can use any symbol here */}
              ❌
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllJobs;
