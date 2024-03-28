import React, { useState, useEffect } from "react";
import JobDetailsModal from "../../../components/company/Jobs/JobDetailsModal";
import { FaArrowLeft } from "react-icons/fa";
import {
  fetchComJobs,
  changeStatusOfJob,
} from "@/redux/actions/companyActions";
import { useSelector } from "react-redux";
import { IUserSelector } from "@/interface/IUserSlice";
import { format } from "date-fns";
import CompanyEditForm from "./CompanyEditForm";
import AlertBox from "../../common/AlertBox";
import { useNavigate } from "react-router-dom";

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
  onEditJob,
}) => {
  const { user } = useSelector((state: IUserSelector) => state.user);

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [jobs, setJobs] = useState<any[]>([]);

  const [selectedJob, setSelectedJob] = useState<{
    _id: string;
    status: boolean;
    jobTitle: string;
    createdAt: string;
    category: string;
    companyId: string;
    jobDescription: string;
    jobExpiry: string;
    jobType: string;
    requirements: string[];
    salary: string;
    skills: string[];
    updatedAt: string;
    vacancy: number;
    __v: number;
    noOfApplications: number;
  } | null>(null);

  const [editingJob, setEditingJob] = useState<{
    _id: string;
    requirements: string[];
    skills: string[];
    jobExpiry: any;
    status: boolean;
    jobDescription: string;
    createdAt: string;
    jobType: string;
    jobTitle: string;
    category: string;
    vacancy: number;
  } | null>(null);
  const [dropdownJobId, setDropdownJobId] = useState<string | null>(null);
  const navigate = useNavigate();

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
  }, [editingJob]);

  const handleMoreDetails = (jobId: string) => {
    setDropdownJobId(jobId);
    setDropdownOpen(!dropdownOpen); // Toggle the dropdown state
  };

  const handleDropdownOptionClick = async (option: string) => {
    setDropdownJobId(null);

    try {
      if (option === "Details") {
        const job = jobs.find((j) => j._id === dropdownJobId);
        if (job) {
          setSelectedJob(job);
        }
      } else if (option === "Edit") {
        handleEditJob(dropdownJobId);
      } else if (option === "Block" || option === "Unblock") {
        // Call the action to update the status
        await changeStatusOfJob(dropdownJobId!, option === "Unblock");

        // If the status update is successful, update the local state
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job._id === dropdownJobId
              ? { ...job, status: option === "Unblock" }
              : job
          )
        );
      }
    } catch (error) {
      console.error("Error handling dropdown option click:", error);
    }
  };

  const handleEditJob = (jobId: string | null) => {
    const job = jobs.find((j) => j._id === jobId);
    if (job) {
      setEditingJob(job);
    }
  };

  const handleSaveEdit = (values: any) => {
    const updated = jobs.filter((job) => {
      return job._id === values.jobId ? values : job;
    });

    setJobs(updated);

    if (editingJob) {
      onEditJob && onEditJob(editingJob._id, editingJob);
      setEditingJob(null);
    }
  };

  const closeModal = () => {
    setSelectedJob(null);
    setEditingJob(null);
  };

  return (
    <div className="overflow-x-auto h-screen">
      <table className="text-sm min-w-full  bg-white border  border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Job Title</th>
            <th className="py-2 px-4 border-b">Posted Date</th>
            <th className="py-2 px-4 border-b">Status</th>
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
              <td className=" py-2 px-4 border-b">
                <span
                  className={`border-2 px-3 text-center rounded-md font-semibold font-mono ${
                    job?.jobExpiry && new Date(job.jobExpiry) < new Date()
                      ? "border-red-300 hover:border-red-600 text-red-500"
                      : job?.status
                      ? "border-green-300 hover:border-green-600 text-green-500"
                      : "border-red-300 hover:border-red-600 text-red-500"
                  }`}
                >
                  {job?.jobExpiry && new Date(job.jobExpiry) < new Date()
                    ? "Expired"
                    : job?.status
                    ? "Live"
                    : "Blocked"}
                </span>
              </td>
              <td className="py-2 px-4 border-b">{job.category}</td>
              <td className="py-2 px-4 border-b">{job.vacancy}</td>
              <td className="py-2 px-4 border-b">{job.applicants.length}</td>
              <td className="py-2 px-4 border-b relative">
                <div className="relative group">
                  <button
                    className={`${
                      job?.applicants.length > 0
                        ? "hover:bg-blue-700 text-white bg-blue-500"
                        : "disabled bg-gray-300 text-black"
                    } px-3 py-2 rounded-md m-1`}
                    onClick={() => {
                      if (job?.applicants.length > 0) {
                        navigate(`/company/job/viewApplicants/${job._id}`);
                      }
                    }}
                  >
                    {job?.applicants.length > 0
                      ? "View Applicants"
                      : "No applicants"}
                  </button>

                  <button
                    className="bg-transparent px-4 py-2 hover:border-blue-500 hover:border m-2 border-black rounded-md font-sans border"
                    onClick={() => handleMoreDetails(job._id)}
                  >
                    More
                  </button>
                  {dropdownOpen &&
                    dropdownJobId !== null &&
                    dropdownJobId === job._id && (
                      <div className="relative -right-2 left-0 top- z-10 font-semibold bg-white border  border-gray-300 p-2 rounded-md ">
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
                        {job.status ? (
                          <AlertBox
                            button={
                              <div
                                className="cursor-pointer text-red-500 hover:bg-gray-200 py-1 px-2"
                                // onClick={() =>
                                //   handleDropdownOptionClick("Block")
                                // }
                              >
                                Block
                              </div>
                            }
                            ques="Are you sure you want to block this job?"
                            onConfirm={() => handleDropdownOptionClick("Block")}
                            onCancel={() => {}}
                            option={false} // Add this line to enable the reason input field
                            placeholder="Enter reason for blocking..."
                          />
                        ) : (
                          <AlertBox
                            button={
                              <div
                                className="cursor-pointer text-green-500 hover:bg-gray-200 py-1 px-2"
                                // onClick={() =>
                                //   handleDropdownOptionClick("Unblock")
                                // }
                              >
                                Unblock
                              </div>
                            }
                            ques="Are you sure you want to unblock this job?"
                            onConfirm={() =>
                              handleDropdownOptionClick("Unblock")
                            }
                            onCancel={() => {}}
                          />
                        )}{" "}
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
        <div className=" absolute top-0 left-0 min-h-screen h-auto w-full  flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md">
            {/* Edit Job Form */}

            {/* <CompanyEditForm Values={editingJob} /> */}
            <CompanyEditForm
              Values={editingJob}
              onClose={closeModal}
              onSave={(values: any) => handleSaveEdit(values)}
            />

            {/* Save and Cancel buttons */}
            <div className="mt-4">
              {/* <button
                className="bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded-md mr-2 text-white"
                onClick={handleSaveEdit}
              >
                Save
              </button> */}
              <button
                className=" flex justify-center items-center gap-2 bg-gray-500 text-sm hover:bg-gray-700 px-3 py-2 rounded-md text-white"
                onClick={closeModal}
              >
                <FaArrowLeft />
                Back to Jobs
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyJobsTable;
