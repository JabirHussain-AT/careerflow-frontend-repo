import React, { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/redux/store'; 
import ModalBox from '@/components/common/ModalBox';
import { submitViewProfileUpdations } from '@/redux/actions/userActions';
import { IUserSelector } from '@/interface/IUserSlice';

interface EducationData {
  scheme: string;
  institution: string;
  startDate: string;
  endDate: string;
}

const Education: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: IUserSelector) => state.user);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [educations, setEducations] = useState<EducationData[]>(user?.education);
  const [currentEducation, setCurrentEducation] = useState<EducationData>({
    scheme: '',
    institution: '',
    startDate: '',
    endDate: '',
  });
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setCurrentEducation({
      scheme: '',
      institution: '',
      startDate: '',
      endDate: '',
    });
    setValidationErrors([]);
  };

  const handleRemoveEducation = (index: number) => {
    const updatedEducations = [...educations];
    updatedEducations.splice(index, 1);
    setEducations(updatedEducations);
    handleClose(); // Call handleClose here
  };

  const handleSchemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentEducation((prev) => ({ ...prev, scheme: e.target.value }));
  };

  const handleInstitutionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentEducation((prev) => ({ ...prev, institution: e.target.value }));
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentEducation((prev) => ({ ...prev, startDate: e.target.value }));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentEducation((prev) => ({ ...prev, endDate: e.target.value }));
  };

  const handleSubmit = () => {
    const errors: string[] = [];

    if (!currentEducation.scheme.trim()) {
      errors.push('Degree is required');
    }

    if (!currentEducation.institution.trim()) {
      errors.push('Institution is required');
    }

    if (!currentEducation.startDate.trim()) {
      errors.push('Start Date is required');
    }

    if (!currentEducation.endDate.trim()) {
      errors.push('End Date is required');
    }

    if (currentEducation.startDate > currentEducation.endDate) {
      errors.push('Start Date must be before End Date');
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      console.error('Validation error: Please correct the input fields');
    } else {
      setEducations((prev) => { 
        let updatedEducations =  [...prev, currentEducation]
        let dataToSend = {
          userId : user?._id ,
          education :  updatedEducations
        }
        dispatch(submitViewProfileUpdations( dataToSend ))
        return updatedEducations
      });
      handleCloseModal();
    }
  };

  
  const handleClose  = () => {
    if(educations.length < 1 && !currentEducation.scheme.trim()){
      let dataToSend = {
        userId: user?._id,
        education : [],
      };
      return dispatch(submitViewProfileUpdations(dataToSend)); 
    }

    setEducations((prev) => { 
      let updatedEducations =  [...prev]
      let dataToSend = {
        userId : user?._id ,
        education :  updatedEducations
      }
      dispatch(submitViewProfileUpdations( dataToSend ))
      return updatedEducations
    });
    handleCloseModal();
  };

  return (
    <div className="w-full md:w-10/12 mx-auto mb-5 mt-5 border p-5">
      <div className="flex justify-between items-center font-semibold text-gray-700">
        <h1 className="underline">Education</h1>
        <FiEdit className="text-md text-blue-600" onClick={handleOpenModal} />
      </div>
      <div className="mt-4" about="education showing">
        {educations && educations.length > 0 ? (
          <ul className="list-disc">
            {educations.map((edu, index) => (
              <li key={index} className="ml-10 m-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="mb-2 md:mb-0 md:mr-4">
                    <p className="font-semibold text-md font-sans">{edu.scheme}</p>
                    <p className="font-semibold text-sm">{edu.institution}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-xs">{`${edu.startDate} - ${edu.endDate}`}</p>
                    <div className="px-1 py-1 ml-2">
                      <RxCross2
                        className="hover:scale-125 hover:font-bold hover:shadow-xl hover:text-red-600 cursor-pointer"
                        onClick={() => handleRemoveEducation(index)}
                      />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500 mt-4 text-center">No education experiences added</div>
        )}
      </div>

      <ModalBox isOpen={isOpen} onClose={handleCloseModal}>
        <div className="w-full">
          <h2 className="text-md text-start mx-6 my-2 text-gray-900 font-semibold font-sans underline">
            Education
          </h2>
          <div className="flex justify-center items-center mb-3">
            <input
              type="text"
              placeholder="Scheme"
              className="w-11/12 md:w-2/3 p-1 border-2 rounded-lg h-auto"
              value={currentEducation.scheme}
              onChange={handleSchemeChange}
            />
          </div>
          <div className="flex justify-center items-center mb-3">
            <input
              type="text"
              placeholder="Institution"
              className="w-11/12 md:w-2/3 p-1 border-2 rounded-lg h-auto"
              value={currentEducation.institution}
              onChange={handleInstitutionChange}
            />
          </div>
          <div className="flex justify-center items-center mb-3">
            <input
              type="date"
              placeholder="Start Date"
              className="w-11/12 md:w-2/3 p-1 border-2 rounded-lg h-auto"
              value={currentEducation.startDate}
              onChange={handleStartDateChange}
            />
          </div>
          <div className="flex justify-center items-center mb-3">
            <input
              type="date"
              placeholder="End Date"
              className="w-11/12 md:w-2/3 p-1 border-2 rounded-lg h-auto"
              value={currentEducation.endDate}
              onChange={handleEndDateChange}
            />
          </div>
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
            {/* You can add additional functionality for Save and Add if needed */}
          </div>
        </div>
      </ModalBox>
    </div>
  );
};

export default Education;
