import React from 'react';

interface JobDetailsModalProps {
  job: {
    _id: string;
    jobTitle: string;
    createdAt: string;
    category: string;
    status : boolean ,
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
    noOfApplications : number
  };
  onClose: () => void;
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ job, onClose }) => {
  return (
    <div className="fixed inset-0 overflow-auto  scrollbar flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white  p-6 rounded-md shadow-md w-full max-w-md transform transition-transform">
        <span className="absolute top-0 right-0 cursor-pointer p-2" onClick={onClose}>
          &times;
        </span>
        <h2 className="text-xl py-1  font-mono bg-blue-500 rounded text-white px-5 text-center   font-bold mb-4">{job.jobTitle}</h2>
        <div className="mb-4">
          <strong>Posted Date:</strong> {job.createdAt}
        </div>
        <div className="mb-4">
          <strong>Category:</strong> {job.category}
        </div>
        <div className="mb-4">
          <strong>Company ID:</strong> {job.companyId}
        </div>
        <div className="mb-4">
          <strong>Job Description:</strong> {job.jobDescription}
        </div>
        <div className="mb-4">
          <strong>Job Expiry:</strong> {job.jobExpiry}
        </div>
        <div className="mb-4">
          <strong>Status :</strong> {job.status ? "Live" : "Blocked"}
        </div>
        <div className="mb-4">
          <strong>Job Type:</strong> {job.jobType}
        </div>
        <div className="mb-4">
          <strong>Requirements:</strong> {job.requirements.join(', ')}
        </div>
            {/* <div className="mb-4">
              <strong>No Of Applicants :</strong> {job.requirements.length }
            </div> */}
        <div className="mb-4">
          <strong>Salary:</strong> {job.salary}
        </div>
        <div className="mb-4">
          <strong>Skills:</strong> {job.skills.join(', ')}
        </div>
        <div className="mb-4">
          <strong>Updated At:</strong> {job.updatedAt}
        </div>
        <div className="mb-4">
          <strong>Vacancy:</strong> {job.vacancy}
        </div>
        <div className="border-t mt-6 pt-4">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;
