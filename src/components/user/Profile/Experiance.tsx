import React, { useState , useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import ModalBox from "@/components/common/ModalBox";
import { RxCross2 } from "react-icons/rx";
import  { submitViewProfileUpdations } from "@/redux/actions/userActions"
import  { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "@/redux/store";  
import { IUserSelector } from "@/interface/IUserSlice";

interface ExperienceData {
  jobPosition: string;
  company: string;
  fromDate: string;
  toDate: string | "Present";
}

const Experience: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: IUserSelector) => state.user);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [experiences, setExperiences] = useState<ExperienceData[]>(user?.experiance);
  const [currentExperience, setCurrentExperience] = useState<ExperienceData>({
    jobPosition: "",
    company: "",
    fromDate: "",
    toDate: "",
  });
  const [isPresent, setIsPresent] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  useEffect(() => {
    // This effect will be triggered whenever 'experiences' changes
    handleSubmit();
  }, [experiences]);
  

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setCurrentExperience({
      jobPosition: "",
      company: "",
      fromDate: "",
      toDate: "",
    });
    setIsPresent(false);
    setValidationErrors([]);
  };

  const handleRemoveExperience = (index: number) => {
    const updatedExperience = [...experiences];
    updatedExperience.splice(index, 1);
  
    setExperiences(updatedExperience);
  
    if (updatedExperience.length === 0) {
      // If all experiences are removed, submit an empty array
      let dataToSend = {
        userId: user?._id,
        experiance: [],
      };
      dispatch(submitViewProfileUpdations(dataToSend));
    } else {
      // If there are remaining experiences, trigger handleSubmit
      handleClose();
    }
  };
  
  

  const handleJobPositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentExperience((prev) => ({ ...prev, jobPosition: e.target.value }));
  };

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentExperience((prev) => ({ ...prev, company: e.target.value }));
  };

  const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentExperience((prev) => ({ ...prev, fromDate: e.target.value }));
  };

  const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentExperience((prev) => ({ ...prev, toDate: e.target.value }));
  };

  const handlePresentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPresent(e.target.checked);
    setCurrentExperience((prev) => ({
      ...prev,
      toDate: e.target.checked ? "Present" : "",
    }));
  };
  

  const handleSubmit = () => {
    console.log('calling = > ');
    const errors: string[] = [];

    if (!currentExperience.jobPosition.trim()) {
      errors.push("Job Position is required");
    }
  
    if (!currentExperience.company.trim()) {
      errors.push("Company is required");
    }
  
    if (!currentExperience.fromDate.trim()) {
      errors.push("From Date is required");
    }
  
    if (!isPresent && !currentExperience.toDate.trim()) {
      errors.push("To Date is required");
    }
  
    if (!isPresent && currentExperience.fromDate > currentExperience.toDate) {
      errors.push("From Date must be before To Date");
    }
  
    if (errors.length > 0) {
      setValidationErrors(errors);
      console.error("Validation error: Please correct the input fields");
    } else {
      setExperiences((prev) => {
        let data = [...prev, currentExperience];
        let dataToSend = {
          userId: user?._id,
          experiance: data,
        };
        dispatch(submitViewProfileUpdations(dataToSend));
        return data;
      });
      console.log(experiences, 'this is the experiences, check ');
      handleCloseModal();
    }
  };
  
  const handleClose = () => {
    
    if(experiences.length < 1 && !currentExperience.jobPosition.trim()){
      let dataToSend = {
        userId: user?._id,
        experiance: [],
      };
      return dispatch(submitViewProfileUpdations(dataToSend)); 
    }
  
      setExperiences((prev) => {
        let data = [...prev];
        let dataToSend = {
          userId: user?._id,
          experiance: data,
        };
        dispatch(submitViewProfileUpdations(dataToSend));
        return data;
      });
      console.log(experiences, 'this is the experiences, check ');
      handleCloseModal();
  };
  
  const handleSaveAndAdd = () => {
    const errors: string[] = [];
  
    if (!currentExperience.jobPosition.trim()) {
      errors.push("Job Position is required");
    }
  
    if (!currentExperience.company.trim()) {
      errors.push("Company is required");
    }
  
    if (!currentExperience.fromDate.trim()) {
      errors.push("From Date is required");
    }
  
    if (!isPresent && !currentExperience.toDate.trim()) {
      errors.push("To Date is required");
    }
  
    if (!isPresent && currentExperience.fromDate > currentExperience.toDate) {
      errors.push("From Date must be before To Date");
    }
  
    if (errors.length > 0) {
      setValidationErrors(errors);
      console.error("Validation error: Please correct the input fields");
    } else {
      setExperiences((prev) => {
        const newData = [...prev, currentExperience];
        let dataToSend = {
          userId: user?._id,
          experiance: newData.length > 0 ? newData : [], // Submit an empty array if length is 0
        };
        dispatch(submitViewProfileUpdations(dataToSend));
        setCurrentExperience({
          jobPosition: "",
          company: "",
          fromDate: "",
          toDate: "",
        });
        setIsPresent(false);
        return newData;
      });
    }
  };
  
  

  return (
    <div className="w-full md:w-10/12 mx-auto mt-5 border p-5">
      <div className="flex justify-between items-center font-semibold text-gray-700">
        <h1 className="underline">Experience</h1>
        <FiEdit className="text-md text-blue-600" onClick={handleOpenModal} />
      </div>
      <div className="mt-4 ms-10  " about="experience showing">
        {experiences && experiences.length > 0 ? (
          <ul className="list-disc">
            {experiences.map((exp, index) => (
              <li key={index} className="mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="mb-2 md:mb-0 md:mr-4">
                    <p className="font-semibold text-md font-sans">
                      {exp.jobPosition}
                    </p>
                    <p className="font-semibold text-sm">{exp.company}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-xs">
                      {`${exp.fromDate} - ${
                        exp.toDate === "Present" ? "Present" : exp.toDate
                      }`}
                    </p>
                    <div className="px-1 py-1 ml-2">
                      <RxCross2
                        className="hover:scale-125 hover:font-bold hover:shadow-xl hover:text-red-600 cursor-pointer"
                        onClick={() => handleRemoveExperience(index)}
                      />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500 mt-4 text-center">
            No experiences added
          </div>
        )}
      </div>

      <ModalBox isOpen={isOpen} onClose={handleCloseModal}>
        <div className="w-full">
          <h2 className="text-md text-start mx-6 my-2 text-gray-900 font-semibold font-sans underline">
            Experience
          </h2>
          <div className="flex justify-center items-center mb-3">
            <input
              type="text"
              placeholder="Job Position"
              className="w-11/12 md:w-2/3 p-1 border-2 rounded-lg h-auto"
              value={currentExperience.jobPosition}
              onChange={handleJobPositionChange}
            />
          </div>
          <div className="flex justify-center items-center mb-3">
            <input
              type="text"
              placeholder="Company"
              className="w-11/12 md:w-2/3 p-1 border-2 rounded-lg h-auto"
              value={currentExperience.company}
              onChange={handleCompanyChange}
            />
          </div>
          <div className="flex justify-center items-center mb-3">
            <input
              type="date"
              placeholder="From Date"
              className="w-11/12 md:w-2/3 p-1 border-2 rounded-lg h-auto"
              value={currentExperience.fromDate}
              onChange={handleFromDateChange}
            />
          </div>
          <div className="flex justify-center items-center">
            <input
              type="checkbox"
              id="presentCheckbox"
              checked={isPresent}
              onChange={handlePresentChange}
            />
            <label htmlFor="presentCheckbox" className="ml-2">
              Are you currently working in this company?{" "}
              <span className="text-blue-500 text-sm underline">Click here</span>
            </label>
          </div>
          {!isPresent && (
            <div className="w-full text-center text-gray-400">OR</div>
          )}
          {!isPresent && (
            <div className="flex justify-center items-center mb-3">
              <input
                type="date"
                placeholder="To Date"
                className="w-11/12 md:w-2/3 p-1 border-2 rounded-lg h-auto"
                value={currentExperience.toDate}
                onChange={handleToDateChange}
                disabled={isPresent}
              />
            </div>
          )}
          {validationErrors.map((error, index) => (
            <div key={index} className="text-red-500 text-sm mx-6 mt-1">
              {error}
            </div>
          ))}
          <div className="flex justify-end m-5">
            <button
              className="bg-blue-900 rounded-lg px-3 py-2 font-sans text-md text-white mr-3"
              onClick={handleSubmit}
            >
              Save
            </button>
            <button
              className="bg-green-500 rounded-lg px-3 py-2 font-sans text-md text-white"
              onClick={handleSaveAndAdd}
            >
              Save and Add
            </button>
          </div>
        </div>
      </ModalBox>
    </div>
  );
};

export default Experience;
