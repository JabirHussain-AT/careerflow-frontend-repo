import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import ViewApplicantDetialSideBar from "@/components/company/Jobs/ViewApplicantDetialSideBar";
import ApplicantDetialsSection from "@/components/company/Jobs/ApplicantDetialsSection";

const ApplicantDetailsSideBar: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const statusOptions = [
    "In-Review",
    "Shortlisted",
    "Interview",
    "Hired",
    "Rejected",
  ];

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  return (
    <>
      <div className="w-full">
        <div className="mt-4 w-full pl-5 flex gap-x-3">
          <div className="w-full flex justify-between">
            <h1 className="font-serif font-semibold text-lg text-blue-gray-900">
              Applicant Details
            </h1>
            <div className="relative inline-block text-left">
              <select
                value={selectedStatus}
                onChange={handleStatusChange}
                className="px-2 py-1 text-white rounded-md m-3 bg-sky-600"
              >
                <option className="bg-gray-400" value="" disabled>
                  Change Status
                </option>
                {statusOptions.map((status, index) => (
                  <option className="bg-white text-black" key={index} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-around">
          <div className="w-3/12">
            <ViewApplicantDetialSideBar />
          </div>
          <div className="w-8/12 mt-3">
            <ApplicantDetialsSection />
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicantDetailsSideBar;
