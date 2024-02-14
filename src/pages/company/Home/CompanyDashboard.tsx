import React, { useState } from "react";
import NavBar from "../../../components/user/Login/NavBar";
import { IUserSelector } from "../../../interface/IUserSlice";
import { useSelector } from "react-redux";
import CompanyModal from "@/components/company/Home/CompanyModal";

const Dashboard: React.FC = () => {
  const { user } = useSelector((state: IUserSelector) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);  

  const handleContinueClick = () => {
    setIsModalOpen(true);
  }; 
  return (
    <> 
      {!user?.approved && user?.stage === 'completed' && user?.approved === false && user?.status !== 'approved'  ? 
      <div className="max-w-md mx-auto mt-10 bg-white p-8 border rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Thank you for submitting</h1>
        {
          user?.status === 'rejected' ?
          <p className="text-gray-600 mb-4">
           Your application is registered , check your registered mail for more  about this
           <br />
           <p className="text-gray-500"> You can re apply this button </p>
           <button onClick={handleContinueClick} className=" bg-blue-500 text-white font-mono from-transparent"> Make changes and apply here</button>
           <CompanyModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </p>

        :
        <p className="text-gray-600 mb-4">
          We will reply to you within 48 hours through email after verification.
        </p>
          }
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-green-500 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <p className="text-green-500">Your Submission is Successfull . </p>
        </div>
      </div>
      :
      <div>
        helloooo
      </div>
}
    </>
  );
};

export default Dashboard;
