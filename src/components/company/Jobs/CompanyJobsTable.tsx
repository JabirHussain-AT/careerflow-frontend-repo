import React, { useState, useEffect } from "react";
import JobDetailsModal from "../../../components/company/Jobs/JobDetailsModal";
import { fetchComJobs } from "@/redux/actions/companyActions";
import { useSelector } from "react-redux";
import { IUserSelector } from "@/interface/IUserSlice";
import { format } from "date-fns";
import CompanyEditForm from "./CompanyEditForm";

interface CompanyJobsTableProps {
  Ijobs?: {
    _id: string;
    jobTitle: string;
    createdAt?: string;
    category: string;
    vacancy: number;
    noOfApplications: number;
  }[];
  onViewApplicants?: (jobId: string) => void;
  onMoreDetails?: (jobId: string) => void;
  onEditJob?: (jobId: string, updatedJob: any) => void;
}

const CompanyJobsTable: React.FC<CompanyJobsTableProps> = ({
  Ijobs,
  onViewApplicants,
  onMoreDetails,
  onEditJob,
}) => {
  const { user } = useSelector((state: IUserSelector) => state.user);

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<{
    _id: string;
    jobTitle: string;
    createdAt: string;
    category: string;
    vacancy: number;
    noOfApplications: number;
  } | null>(null);
  const [editingJob, setEditingJob] = useState<{
    _id: string;
    jobTitle: string;
    category: string;
    vacancy: number;
  } | null>(null);
  const [dropdownJobId, setDropdownJobId] = useState<string | null >(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchComJobs(user._id);
        setJobs(data?.data);
      } catch (error) {
        console.error("Error fetching company jobs:", error);
      }
    };

    fetchData();
  }, []);

  const handleMoreDetails = (jobId: string) => {
    setDropdownJobId(jobId);
    setDropdownOpen(!dropdownOpen); // Toggle the dropdown state
  };

  const handleDropdownOptionClick = (option: string) => {
    setDropdownJobId(null);
    if (option === "Details") {
      const job = jobs.find((j) => j._id === dropdownJobId);
      if (job) {
        setSelectedJob(job);
      }
    } else if (option === "Edit") {
      // Handle Edit option as needed
      handleEditJob(dropdownJobId );
    } else if (option === "Block") {
      // Handle Block option as needed
    } else if (option === "Unblock") {
      // Handle Unblock option as needed
    }
  };

  const handleEditJob = (jobId: string | null) => {
    const job = jobs.find((j) => j._id === jobId);
    if (job) {
      setEditingJob(job);
    }
  };

  const handleSaveEdit = () => {
    if (editingJob) {
      // Perform any validation or other checks if needed
      onEditJob && onEditJob(editingJob._id, editingJob);
      setEditingJob(null);
    }
  };

  const closeModal = () => {
    setSelectedJob(null);
    setEditingJob(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="text-sm min-w-full  bg-white border  border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Job Title</th>
            <th className="py-2 px-4 border-b">Posted Date</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Vacancy</th>
            <th className="py-2 px-4 border-b">No Of Applications</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job._id}>
              <td className="py-2 px-4 border-b">{job.jobTitle}</td>
              <td className="py-2 px-4 border-b">
                {format(new Date(job.createdAt), "dd - MM - yyyy, hh:mm a")}
              </td>
              <td className="py-2 px-4 border-b">{job.category}</td>
              <td className="py-2 px-4 border-b">{job.vacancy}</td>
              <td className="py-2 px-4 border-b">{job.applicants.length}</td>
              <td className="py-2 px-4 border-b relative">
                <div className="relative group">
                  <button
                    className={`${
                      job?.applicants.length > 0
                        ? "hover:bg-blue-700  text-white  bg-blue-500"
                        : "disabled bg-gray-300 text-black"
                    } px-3 py-2 rounded-md m-1`}
                    // onClick={() => onViewApplicants(job._id)}
                  >
                    {job?.applicants.length > 0
                      ? "View Applicants"
                      : " No applicants"}
                  </button>
                  <button
                    className="bg-transparent px-4 py-2 hover:border-blue-500 hover:border m-2 border-black rounded-md font-sans border"
                    onClick={() => handleMoreDetails(job._id)}
                  >
                    More
                  </button>
                  {dropdownOpen && dropdownJobId !== null && dropdownJobId  === job._id && (
                    <div className="absolute -right-2 left-0 top-8 bg-white border  border-gray-300 p-2 rounded-md z-10">
                      <div
                        className="cursor-pointer hover:bg-gray-200 py-1 px-2"
                        onClick={() => handleDropdownOptionClick("Details")}
                      >
                        Details
                      </div>
                      <div
                        className="cursor-pointer hover:bg-gray-200 py-1 px-2"
                        onClick={() => handleDropdownOptionClick("Edit")}
                      >
                        Edit
                      </div>
                      <div
                        className="cursor-pointer hover:bg-gray-200 py-1 px-2"
                        onClick={() => handleDropdownOptionClick("Block")}
                      >
                        Block
                      </div>
                      <div
                        className="cursor-pointer hover:bg-gray-200 py-1 px-2"
                        onClick={() => handleDropdownOptionClick("Unblock")}
                      >
                        Unblock
                      </div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal */}
      {selectedJob && (
        <JobDetailsModal job={selectedJob} onClose={closeModal} />
      )}

      {/* Edit Job Section */}
      {editingJob && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md">
            {/* Edit Job Form */}
            < CompanyEditForm Values={selectedJob} />
            {/* Save and Cancel buttons */}
            <div className="mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded-md mr-2 text-white"
                onClick={handleSaveEdit}
              >
                Save
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 px-3 py-2 rounded-md text-white"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyJobsTable;
