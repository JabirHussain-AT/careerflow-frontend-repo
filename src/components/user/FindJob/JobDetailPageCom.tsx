import React, { useState, useEffect } from "react";
import NavBar from "@/components/user/Home/NavBar";
import { BsSave2 } from "react-icons/bs";
import Footer from "@/components/common/Footer";
import { IJob } from "../../../interface/IJob";
import { format, parseISO } from "date-fns";
import ModalBox from "@/components/common/ModalBox";
import ApplicationForm from "@/components/company/Jobs/JobApplyForm";
import { useDispatch, useSelector } from "react-redux";
import { IUserSelector } from "@/interface/IUserSlice";
import { createJobApply, fetchUser } from "@/redux/actions/userActions";
import { AppDispatch } from "@/redux/store";

interface JobDetailPageProps {
  job: IJob;
}

const JobDetailPageCom: React.FC<JobDetailPageProps> = ({ job }) => {
  const { user } = useSelector((state: IUserSelector) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false); // Add missing state

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await dispatch(fetchUser(user?._id));
        console.log("User data fetched:", response);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); // Call the fetchData function
  }, [dispatch, user?._id]);

  const formattedCreatedAt = format(
    parseISO(job.createdAt ? job.createdAt : ""),
    "MMMM d, yyyy"
  );
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const formattedJobExpiry = format(parseISO(job.jobExpiry), "MMMM d, yyyy");

  const handleModalClose = () => {
    setModalOpen(!isModalOpen);
  };
  const handleModal = () => {
    setModalOpen(true);
  };
  const handleSubmit = async (values: any) => {
    let dataToSend = {
      applicantId: user?._id,
      email: values?.email,
      name: values?.fullName,
      number: values?.phoneNumber,
      resume: values?.resume,
      jobId: job?._id,
    };
    const response = await dispatch(createJobApply(dataToSend));
    console.log(response , 'this is the response from the job application ')
  };

  return (
    <>
      <NavBar />
      <div className="bg-green-200 pb-10 w-full h-auto">
        <h1 className="text-2xl underline p-6 font-sans font-bold">
          Job <span className="text-blue-500"> Info </span>
        </h1>
        <div className="flex flex-col md:flex-row ml-5">
          <div className="w-full md:w-1/2 gap-6 flex items-center h-auto">
            <img className="w-10" src={job.companyId.logo} alt="logo" />
            <div className="flex flex-col">
              <div>
                <h1 className="font-sans font-semibold text-lg md:text-xl">
                  {job.jobTitle}
                </h1>
                <div className="flex items-center">
                  <p className="text-gray-600 text-sm font-sans">
                    {" "}
                    from {job.companyId.userName}
                  </p>
                  <p className="bg-green-600 text-sm ml-3 px-4 rounded text-white">
                    {job.jobType}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-8 mr-10 flex justify-end mt-4  md:mt-0">
            <div className="p-2 bg-gray-300 rounded">
              <BsSave2 className="bg-gray-300 " />
            </div>
            <div className="flex">
                {job.applicants.some((applicant :any ) => applicant.applicantId === user?._id) ? (
                      <button className="px-6 md:px-10 ml-2 text-white text-sm md:text-base font-sans rounded bg-gray-600 hover:bg-gray-200 cursor-not-allowed" disabled>
                        Applied
                      </button>
                    ) : (
              <button
                onClick={() => handleModal()}
                className="bg-blue-500 px-6 md:px-10 ml-2 text-white text-sm md:text-base font-sans rounded"
              >
                Apply Now
              </button>
                    )}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row h-auto mt-4">
          <div className="w-full md:w-2/3">
            <h1 className="m-5 font-mono font-semibold text-lg md:text-xl">
              Job <span className="text-blue-700">Description</span>{" "}
            </h1>
            <div className="w-full mx-5 h-auto">
              <p>{job.jobDescription}</p>
            </div>
          </div>
          <div className="w-full md:w-1/3 flex justify-center items-center mt-4 md:mt-0">
            <div className="bg-white shadow-sm  rounded-lg flex flex-col justify-around items-baseline w-full md:w-4/5 h-3/4">
              <div className="ml-8 my-4 flex items-center gap-4 pt-4">
                <h2 className="font-semibold font-sans text-sm md:text-center">
                  Salary : 
                </h2>
                <p className="text-green-600 font-sans text-sm md:text-center">
                  {job.fromSalary} - {job.toSalary}
                </p>
              </div>
              <div className="my-4">
                <h2 className="font-semibold font-sans text-sm md:text-base">
                  Job Type
                </h2>
                <p className="text-green-600 font-sans text-sm md:text-base">
                  {job.jobType}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-auto mt-4">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-2/3">
              <h1 className="pt-4 px-5 font-semibold font-mono text-lg md:text-xl">
                Requirements:
              </h1>
              <div className="w-full mx-5">
                <ul className="ml-6 list-disc">
                  {job.requirements &&
                    job.requirements.map((requirement, index) => (
                      <li key={index}>{requirement}</li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="w-full md:w-1/3 flex justify-center items-center mt-4 md:mt-0">
              <div className="bg-white shadow-sm rounded-lg pb-6 w-full md:w-4/5">
                <h1 className="font-semibold text-start font-sans m-4 text-sm md:text-base">
                  Job Overview
                </h1>
                <div className="text-start mx-3">
                  <p className="font-mono text-sm md:text-base">
                    Job Posted Date: <span>{formattedCreatedAt}</span>
                  </p>
                  <p className="font-mono text-sm md:text-base">
                    Job Expiry Date: <span>{formattedJobExpiry}</span>
                  </p>
                  <p className="font-mono text-sm md:text-base">
                    No of Vacancies: <span>{job.vacancy}</span>
                  </p>
                  <p className="font-mono text-sm md:text-base">
                    Category: <span>{job.category}</span>
                  </p>
                </div>
                <div className="bg-gray-400 w-full h-0.5 my-2"></div>
                <p className="font-mono text-sm ml-3 pt-2">
                  Share this Job :{" "}
                  <span className="underline text-blue-500 hover:text-blue-700 text-xs">
                    http://job/497349832y8932y
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-32 mt-4">
          <div className="">
            <div className="">
              <h1 className="pt-4 px-5 font-semibold font-mono text-lg md:text-xl">
                Skills:
              </h1>
              <div className="w-full mx-5">
                <ul className="ml-6 list-disc">
                  {job.skills &&
                    job.skills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* its the application modal stariting from here  */}
      <ModalBox isOpen={isModalOpen} onClose={() => handleModalClose()}>
        <ApplicationForm
          userData={user}
          handleSubmit={handleSubmit}
          handleModalClose={handleModalClose}
        />{" "}
      </ModalBox>
      <Footer />
    </>
  );
};

export default JobDetailPageCom;
