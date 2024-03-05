
import React, { useState , useEffect } from "react"; 
import {useParams } from 'react-router-dom'
import ViewApplicantDetialSideBar from "@/components/company/Jobs/ViewApplicantDetialSideBar";
import ApplicantDetialsSection from "@/components/company/Jobs/ApplicantDetialsSection";
import { changeStatusOfJobApplication } from "@/redux/actions/companyActions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

const ApplicantDetailsSideBar: React.FC = () => {
    
  const [selectedStatus, setSelectedStatus] = useState<string>(""); 
  const { jobId , applicantId  } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  
  const statusOptions = [
    "inreview",
    "shortlisted",
    "interview",
    "accepted",
    "rejected",
  ];

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const valueFromInput = event.target.value 

    let dataToSend = {
      applicantId : applicantId ,
      jobId : jobId ,
      value : valueFromInput
    }

    const response = dispatch(changeStatusOfJobApplication(dataToSend))
    console.log(response , 'from the viewjObapplicanProfile ')
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
        <div className="flex justify-around ">
          <div className="w-3/12 mb-5">
            <ViewApplicantDetialSideBar />
          </div>
          <div className="w-8/12 mt-3 mb-5">
            <ApplicantDetialsSection />
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicantDetailsSideBar;
