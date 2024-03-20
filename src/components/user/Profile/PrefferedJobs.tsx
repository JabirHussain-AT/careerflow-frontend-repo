import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import ModalBox from "@/components/common/ModalBox";
import { submitViewProfileUpdations } from "@/redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { IUserSelector } from "@/interface/IUserSlice";
import { RxCross2 } from "react-icons/rx";

const PreferredJobs: React.FC = () => {
  const { user } = useSelector((state: IUserSelector) => state.user);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const [preferredJobs, setPreferredJobs] = useState<string[]>(
    user?.preferredJobs || []
  );
  const [newJob, setNewJob] = useState<string>("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setValidationError(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewJob(e.target.value);
  };

  const handleAddJob = () => {
    // Validate the input value (minimum length)
    if (newJob.length < 3) {
      setValidationError("Please enter at least 3 characters.");
      return;
    }

    setPreferredJobs((prevJobs) => [...prevJobs, newJob]);
    setNewJob("");
    setValidationError(null);
  };

  const handleRemoveJob = (index: number) => {
    setPreferredJobs((prevJobs: any[]) => {
      const data = prevJobs.filter((_, i: number) => i !== index);
      let dataToSubmit = {
        userId: user?._id,
        preferredJobs: data, // Limit to max 5 jobs
      };
      dispatch(submitViewProfileUpdations(dataToSubmit));
      return data;
    });
  };
  
  
 

  const handleSubmit = () => {
    // Validate before submission
    if (preferredJobs.some((job) => job.length < 3)) {
      setValidationError("Please enter at least 3 characters for each job.");
      return;
    }

    // Handle submission logic here
    let dataToSubmit = {
      userId: user?._id,
      preferredJobs: preferredJobs.slice(0, 5), // Limit to max 5 jobs
    };
    dispatch(submitViewProfileUpdations(dataToSubmit));
    
    console.log("Submitted:", preferredJobs);
    handleCloseModal();
  };

  const isPreferredJobsEmpty = preferredJobs.length === 0;

  return (
    <div className="w-full md:w-10/12 mx-auto mt-5 border p-5">
      <div className="flex justify-between items-center font-semibold text-gray-700">
        <h1 className="underline">Preferred Jobs</h1>
        <FiEdit onClick={handleOpenModal} className="text-md text-blue-600" />
      </div>
      <div
        id="preferred-jobs-content"
        className="text-sm text-sans text-pretty mt-3"
      >
        {isPreferredJobsEmpty ? (
          <p>Preferred Jobs not added</p>
        ) : (
          preferredJobs.map((job, index) => (
            <div key={index} className="flex items-center">
              <ul className="ms-5 list-disc">
                <li className="flex items-center justify-center  ">
                  <p className="leading-7">{job}</p>
                  <button
                    onClick={() => handleRemoveJob(index)}
                    className="ml-2 text-red-500"
                  >
                    < RxCross2 className="mt-1 hover:scale-150 hover:font-semibold" />
                  </button>
                </li>
              </ul>
            </div>
          ))
        )}
      </div>
      <ModalBox isOpen={isOpen} onClose={handleCloseModal}>
        <div className="w-full">
          <h2 className="text-md text-start mx-6 my-2 text-gray-900 font-semibold font-sans underline">
            Preferred Jobs
          </h2>
          <div className="flex flex-col justify-center items-center">
            {preferredJobs.map((job, index) => (
              <div key={index} className="flex items-center mb-3">
                <p className="leading-7">{job}</p>
                <button
                  onClick={() => handleRemoveJob(index)}
                  className="ml-2 text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
            <input
              maxLength={100}
              minLength={3}
              required
              className={`w-11/12 p-1 border-2 rounded-lg mb-3 ${
                validationError ? "border-red-500" : ""
              }`}
              placeholder="Add a new job"
              value={newJob}
              onChange={handleInputChange}
            />
            {validationError && (
              <div className="text-red-500 text-sm mx-6 mt-1">
                {validationError}
              </div>
            )}
            <button
              className={`bg-blue-900 rounded-lg px-3 py-2 font-sans text-md text-white ${
                validationError ? "cursor-not-allowed" : ""
              }`}
              onClick={handleAddJob}
              disabled={validationError !== null}
            >
              Add Job
            </button>
          </div>
          <div className="flex justify-end m-5">
            <button
              className={`bg-blue-900 rounded-lg px-3 py-2 font-sans text-md text-white ${
                validationError ? "cursor-not-allowed" : ""
              }`}
              onClick={handleSubmit}
              disabled={validationError !== null}
            >
              Submit
            </button>
          </div>
        </div>
      </ModalBox>
    </div>
  );
};

export default PreferredJobs;
