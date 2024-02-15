import React from 'react';

interface JobDetailsModalProps {
  job: {
    _id: string;
    jobTitle: string;
    createdAt?: string;
    category: string;
    vacancy: number;
    noOfApplications: number;
  };
  onClose: () => void;
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ job, onClose }) => {
  return (
    <div className="fixed inset-0 font-mono flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md transform transition-transform">
        <span className="absolute top-0 right-0 cursor-pointer p-2" onClick={onClose}>
          &times;
        </span>
        <h2 className="text-2xl font-bold mb-4">{job.jobTitle}</h2>
        <div className="mb-2">
          <strong>Posted Date:</strong> {job.createdAt}
        </div>
        <div className="mb-2">
          <strong>Category:</strong> {job.category}
        </div>
        <div className="mb-2">
          <strong>Vacancy:</strong> {job.vacancy}
        </div>
        <div className="mb-4">
          <strong>No Of Applications:</strong> {job.noOfApplications ?? 0}
        </div>
        {/* Add more details as needed */}
      </div>
    </div>
  );
};

export default JobDetailsModal;
