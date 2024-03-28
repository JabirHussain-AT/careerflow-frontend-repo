import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IUserSelector } from "@/interface/IUserSlice";
import { AppDispatch } from "@/redux/store";
import { getUserApplications } from "@/redux/actions/userActions"; // Import your action
import { IJob } from "@/interface/IJob";

const MyApplications: React.FC = () => {
  const [jobApplications, setJobApplications] = useState<IJob[]>([]);

  const { user } = useSelector((state: IUserSelector) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getUserApplications(user._id));
        const userDataFromServer = response.payload.data;
        setJobApplications(userDataFromServer);
        console.log(
          userDataFromServer,
          "this is the user data from the server "
        );
      } catch (error) {
        console.error("Error fetching user applications:", error);
      }
    };

    fetchData();
  }, []);

  // Helper function to get hiring stage color
  const getHiringStageColor = (stage: string) => {
    switch (stage) {
      case "Applyed":
        return "text-blue-500";
      case "Reviewed":
        return "text-green-500";
      case "Shortlisted":
        return "text-yellow-500";
      case "Interview":
        return "text-purple-500";
      default:
        return "text-gray-500";
    }
  };

  // Render the component
  return (
    <div className="m-5 flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {jobApplications?.map((application: IJob) => (
          <div
            key={application._id}
            className="bg-white border border-gray-300 p-6 rounded-md shadow-md transition-transform transform hover:scale-105"
          >
            <div className="flex items-center gap-4  justify-between mb-6">
              <div className="flex items-center gap-3">
                <img
                  src={application?.companyId?.logo}
                  alt={`${application?.companyId?.userName} Logo`}
                  className="w-10 h-10 object-cover rounded-full"
                />
                <h1 className="font-serif  font-semibold text-lg">
                  {application.companyId?.userName}
                </h1>
              </div>
              <span
                className={`text-sm font-semibold ${getHiringStageColor(
                  application.applicants[0]?.hiringStage
                )} `}
              >
                {application.applicants[0]?.hiringStage}
              </span>
            </div>
            <h3 className="text-md font-sans  font-semibold mb-2">
              {application?.jobTitle}
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              {application?.companyId?.userName}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              Applied Date:{" "}
              {new Date(
                application.applicants[0]?.appliedDate
              ).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyApplications;
