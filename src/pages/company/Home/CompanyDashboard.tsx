import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/reducers/user/userSlice";
import { IUserSelector } from "@/interface/IUserSlice";
import CompanyModal from "@/components/company/Home/CompanyModal";
import CompanyDash from "@/components/company/Home/dashboard/CompanyDash";

const Dashboard: React.FC = () => {
  const { user } = useSelector((state: IUserSelector) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch()

  const handleContinueClick = () => {
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    console.log("its here in logout");
    dispatch(logout());
  };


  return (
    <>
      {( user?.stage === 'completed' && user?.status !== 'approved')  ? (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 border rounded shadow">
          <h1 className="text-2xl font-bold mb-4">Thank you for submitting</h1>
          <div className="flex justify-center">
            <button onClick={handleLogout} className="bg-gray-500 text-sm items-center text-white px-6 font-serif rounded-md h-6 w-3/2">Logout </button>
          </div>

          {user?.status === 'rejected' ? (

            <div>
              <p className="text-gray-600 mb-4">
                Your application is  rejected . Check your registered mail for more information.
              </p>
              <p className="text-gray-500">You can reapply using the button below:</p>
              <button onClick={handleContinueClick} className="bg-blue-500 text-white font-mono">Make changes and apply here</button>
              <CompanyModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            </div>


          ) : (
             user?.status === 'pending'  ?


             <div className="max-w-md mx-auto mt-10 bg-white p-8 border rounded shadow">
             <p className="text-gray-600 mb-4">
               We will reply to you within 48 hours through email after verification.
             </p>
             <div className="flex items-center">
               <svg
                 xmlns="http://www.w3.org/20 00/svg"
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
               <p className="text-green-500">Your Submission is Successfull.</p>
             </div>
           </div>
           
             :
             <div className="bg-red-800 h-10 w-full"> Approved  </div>
          )}
        </div>
      ) : (
        <div>
         <CompanyDash />
        </div>
      )}
    </>
  );
};

export default Dashboard;
