import { IUserSelector } from "@/interface/IUserSlice";
import { fetchComJobs } from "@/redux/actions/companyActions";
import { getUser } from "@/redux/actions/userActions";
import { BsArrowRightCircle } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";

interface Applicant {
  id: number;
  applicantId: any;
  name: string;
  email: string;
  appliedDate: string;
  hiringStage: string;
}

interface Job {
  _id: string;
  jobTitle: string;
  applicants: Applicant[];
  // Add other properties as needed
}

const ViewJobApplicants: React.FC = () => {
  const { user } = useSelector((state: IUserSelector) => state.user);
  const [selectedFilter, setSelectedFilter] = useState<string>("applyed");

  const { jobId } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [applicantData, setApplicantData] = useState<any>(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredApplicants, setFilteredApplicants] = useState<Applicant[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchComJobs(user._id);
        const foundJob =
          res.data.find((job: Job) => jobId === job._id) || null;
        setJob(foundJob);  

        if (foundJob) {
          const applicantDataFetch = await getUser(
            foundJob?.applicants?.[0]?.applicantId
          );
          setApplicantData(applicantDataFetch);
        }
      } catch (error) {
        console.error("Error fetching company jobs:", error);
      }
    };

    fetchData();
  }, [jobId, user._id]);

  const getHiringStageColor = (hiringStage: string): string => {
    switch (hiringStage) {
      case "Applyed":
        return "px-2 py-1 border border-blue-400 text-blue-500 rounded";
      case "In-Review":
        return "px-2 py-1 border border-yellow-400 text-yellow-500 rounded";
      default:
        return "";
    }
  };

  const handleFilter = (selectedStatus: string) => {
    const filtered = job?.applicants.filter(
      (applicant: Applicant) =>
        applicant.hiringStage.toLowerCase() ===
          selectedStatus.toLowerCase() &&
        applicant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredApplicants(filtered || []);
    setSelectedFilter(selectedStatus);
  };

  return (
    <div className="container mx-auto my-8">
      <div className="mb-4">
        <h1 className="text-3xl font-bold mb-2">{job?.jobTitle}</h1>
        {/* Render job details if available */}
        {job && (
          <div className="flex w-full justify-between items-center space-x-4">
            {/* Job status details */}
            <div className="flex gap-3">
              {[
                "Applyed",
                "In-Review",
                "Short Listed",
                "Interview",
                "Hired",
                "Rejected",
              ].map((status, index) => (
                <div
                  className={`relative flex items-center cursor-pointer ${
                    selectedFilter.toLowerCase() === status.toLowerCase()
                      ? "text-blue-500"
                      : "text-gray-500"
                  }`}
                  key={index}
                  onClick={() => handleFilter(status)}
                >
                  <h1 className="font-semibold font-sans">{status}</h1>
                  <div
                    className={`h-1 bg-${status
                      .toLowerCase()
                      .replace(" ", "-")}-400 absolute bottom-0 left-0 right-0 ${
                      selectedFilter.toLowerCase() === status.toLowerCase()
                        ? "border-b-2 border-blue-500"
                        : ""
                    }`}
                  ></div>
                </div>
              ))}
            </div>
            {/* Search input */}
            <input
              type="text"
              placeholder="Search by name"
              className="border border-gray-300 p-2"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                handleFilter("");
              }}
            />
          </div>
        )}
      </div>

      {/* Render applicants table if available */}
      {job && (
        <>
          {job?.applicants.length > 0 ? (
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Sr No</th>
                  <th className="py-2 px-4 border-b">Applicant Name</th>
                  <th className="py-2 px-4 border-b">Applicant Email</th>
                  <th className="py-2 px-4 border-b">Applied Date</th>
                  <th className="py-2 px-4 border-b">Hiring Stage</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {job?.applicants.map((applicant: Applicant, index: number) => (
                  <tr key={applicant.id}>
                    <td className={`py-2 px-4 border-b`}>{index + 1}</td>
                    <td className={`py-2 px-4 border-b`}>{applicant.name}</td>
                    <td className={`py-2 px-4 border-b`}>{applicant.email}</td>
                    <td className={`py-2 px-4 border-b `}>
                      {format(applicant.appliedDate, "dd-MM-yyyy")}
                    </td>
                    <td className={`py-2 px-4 border-b text-black`}>
                      <p
                        className={`text-center font-semibold text-black bg-white ${getHiringStageColor(
                          applicant.hiringStage
                        )}`}
                      >
                        {applicant.hiringStage}
                      </p>
                    </td>
                    <td className={`py-2  px-4 border-b`}>
                      <button
                        onClick={() =>
                          navigate(
                            `/company/jobApplicant/viewProfile/${jobId}/${applicant.applicantId}/profile`
                          )
                        }
                        className="text-blue-500 hover:underline flex gap-1 items-center justify-center"
                      >
                        <BsArrowRightCircle />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">
              No applicants available for this job.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default ViewJobApplicants;
