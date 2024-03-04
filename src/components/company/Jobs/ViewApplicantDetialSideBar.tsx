import React from 'react';
import { useParams } from 'react-router-dom';
import { IoMdArrowRoundBack, IoIosPhonePortrait } from 'react-icons/io';
import { MdMessage, MdEmail } from 'react-icons/md';

interface ApplicantData {
  profilePic: string;
  userName: string;
  previousJob: string;
  email: string;
  phone: string;
}

interface LinkedInUrl {
  appliedDate: string;
  hiringStage: string;
}

interface EditJob {
  jobTitle: string;
  category: string;
  typeOfEmployment: string;
}

const ViewApplicantDetialSideBar: React.FC = () => {
  const { userId } = useParams();

  // Replace these placeholders with actual data or variables
  const applicantData: ApplicantData = {
    profilePic: "url/to/profilePic",
    userName: "John Doe",
    previousJob: "Software Developer",
    email: "john@example.com",
    phone: "123-456-7890",
  };

  const linkedInUrl: LinkedInUrl = {
    appliedDate: "2024-03-04",
    hiringStage: "interview", // Replace with the actual hiring stage
  };

  const editJob: EditJob = {
    jobTitle: "Software Engineer",
    category: "IT",
    typeOfEmployment: "Full-time",
  };

  const getDateDifference = (appliedDate: string): number => {
    const providedDateObject = new Date(appliedDate);

    if (isNaN(providedDateObject.getTime())) {
      console.error('Invalid date provided');
      return 0;
    }

    const today = new Date();

    const timeDifference: number = providedDateObject.getTime() - today.getTime();

    const daysDifference = Math.ceil(Math.abs(timeDifference / (1000 * 60 * 60 * 24)));

    return daysDifference;
  };


    
  return (
    <div className="border rounded-md mt-4">
    <div className="flex gap-x-6 ms-5">
      <div>
        <img src={String(applicantData?.profilePic) || ""} alt="" className="w-16 mt-3 h-16 border rounded-full" />
      </div>
      <div>
        <h1 className="font-serif font-semibold text-lg mt-3 text-blue-gray-900">{applicantData?.userName}</h1>
        <h1 className="text-gray-600 text-sm">{applicantData?.previousJob}</h1>
      </div>
    </div>

    <div className="bg-blue-gray-50 mt-4 mb-4 mx-4 rounded-md">
      <div className="flex justify-between border-b-2 mx-3 border-gray-300">
        <h1 className="text-xs py-2">Applied Job</h1>
        <h1 className="text-xs text-gray-600 py-2">{getDateDifference(linkedInUrl?.appliedDate)} Days ago</h1>
      </div>
      <div>
        <h1 className="poppins text-sm font-semibold text-md text-blue-gray-900 mx-3 mt-2">{editJob?.jobTitle}</h1>
        <div className="flex gap-x-1">
          <h1 className="ms-3 text-sm text-gray-700 mt-1 ">{editJob?.category}</h1>
          <h1 className="text-sm font-extrabold text-gray-700 mt-1 ">.</h1>
          <h1 className="text-sm text-gray-700 mt-1 mb-4">{editJob?.typeOfEmployment}</h1>
        </div>
      </div>
    </div>
    <div className="bg-blue-gray-50 mt-4 mb-4 rounded-md mx-4">
      <div className="flex justify-between mx-3  border-gray-300">
        <h1 className="text-sm py-2">Stage</h1>
        <h1 className="text-sm text-blue-400 font-semibold py-2">. {linkedInUrl && linkedInUrl?.hiringStage || "stage"}</h1>
      </div>
      <div>
        <div className="flex gap-x-1">
          <div className={`${linkedInUrl?.hiringStage == "pending" || "inreview" || "shortlist" || "interview" || "accepted" ? "bg-blue-600" : "bg-gray-400 "} w-14 h-2 mt-2 ms-3`}></div>
          <div className={`${linkedInUrl?.hiringStage == "inreview" || "shortlist" || "interview" || "accepted" ? "bg-blue-600" : "bg-gray-400 "} w-14 h-2 mt-2`}></div>
          <div className={`${linkedInUrl?.hiringStage === "shortlist" || "interview" || "accepted" ? "bg-blue-600" : "bg-gray-400 "} w-14 h-2 mt-2`}></div>
          <div className={`${linkedInUrl?.hiringStage === ("interview") || ("accepted") ? "bg-blue-600" : "bg-gray-400 "}  w-14 h-2 mt-2`}></div>
          <div className={`${linkedInUrl?.hiringStage === "accepted" ? "bg-blue-600" : "bg-gray-400 "} w-14 h-2 mt-2 mb-4 me-3`}></div>
        </div>
      </div>
    </div>
    <div className="flex w-full gap-x-2 h-full">
      <div className="border-2 w-5/6 rounded-md  ms-4 flex justify-center h-full py-1 ">
        <h1 className="text-lightgreen font-bold">Schedule Interview</h1>
      </div>
      <div className="border-2 w-1/6 rounded-md  flex me-4 text-lightgreen text-xl justify-center h-full py-1.5 mb-4">
        <h1><MdMessage /></h1>
      </div>
    </div>
    <hr className="mx-4" />
    <div>
      <h1 className="text-lg font-semibold text-blue-gray-800 mx-4 mt-3 poppins">Contact</h1>
    </div>
    <div className="flex mt-5 gap-x-3 ms-4 text-gray-600">
      <MdEmail />
      <h1 className="text-sm">Email</h1>
    </div>
    <h1 className="mx-11 text-sm">{applicantData?.email}</h1>
    <div className="flex mt-5 gap-x-3 ms-4 text-gray-600">
      <IoIosPhonePortrait />
      <h1 className="text-sm">Phone</h1>
    </div>
    <h1 className="mx-11 text-sm">{applicantData?.phone || "Not Provided"}</h1>
  </div>
  )
}

export default ViewApplicantDetialSideBar