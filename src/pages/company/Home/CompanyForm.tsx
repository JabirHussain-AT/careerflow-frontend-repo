import React, { useEffect, useState } from "react";
import NavBar from "../../../components/user/Login/NavBar";
import Img1 from "../../../assets/company1.png";
import CompanyModal from "../../../components/company/Home/CompanyModal";
import { IUserSelector } from "../../../interface/IUserSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompanyForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector((state: IUserSelector) => state.user);
  const navigate = useNavigate()

  useEffect(()=>{
    if(user?.role && user?.stage === 'completed' ) {
      navigate('/company/dashboard')
    } 
  },[])
  
  const handleContinueClick = () => {
    setIsModalOpen(true);
  };


  return (
    <>
      <div className="bg-white w-full h-5/6 flex flex-col sm:flex-row justify-between items-center">
        <div className="sm:ml-24 sm:mt-18 text-center sm:text-left">
          <h2 className="text-3xl font-mono font-semibold py-8">
            Welcome to <span className="text-blue-500">careerFlow</span>
          </h2>
          <h1 className="text-5xl">
            Let's Find Your <br />
            Next Great Hire
          </h1>
          <h5 className="text-xl text-gray-600 font-serif mt-4">
            Login to your Indeed for Employers dashboard to <br /> manage your
            job post, find resumes,
            <br /> start interviewing candidates{" "}
          </h5>
        </div>
        <div className="sm:flex sm:justify-start w-full sm:w-1/2 mt-10">
          <img
            className="sm:mt-0 w-full h-auto sm:w-5/6"
            src={Img1}
            alt="img1"
          />
        </div>
      </div>
      <div className="text-center w-full h-auto">
        <button
          className="rounded border mt-10 py-3 text-white font-mono font-bold px-4 bg-blue-500 hover:bg-blue-700"
          onClick={handleContinueClick}
        >
          Complete your Profile For Continue . . .
        </button>
      </div>
      <CompanyModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default CompanyForm;
