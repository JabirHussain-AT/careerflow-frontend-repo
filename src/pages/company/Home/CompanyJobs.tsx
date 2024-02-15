import CompanyJobsTable from "@/components/company/Jobs/CompanyJobsTable";
import React , {useState} from "react";
import {BsPlus} from 'react-icons/bs'
import { useNavigate } from "react-router-dom";

const CompanyJobs : React.FC = () => {
  
  
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-end">
        <button
          className="bg-blue-500 flex  hover:bg-blue-700 px-3 py-2  rounded-md m-3 text-white"
          onClick={() => navigate("/company/add-jobs")}
        >
          <BsPlus className="text-center text-xl" />
          <span className=" font-mono text-sm "> Add Jobs </span>
        </button>
      </div>
      < CompanyJobsTable  />
    </div>
  );
};

export default CompanyJobs;
