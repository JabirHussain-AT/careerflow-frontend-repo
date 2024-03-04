import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FiEdit } from "react-icons/fi";
import ModalBox from "@/components/common/ModalBox";
import { submitViewProfileUpdations } from "@/redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { IUserSelector } from "@/interface/IUserSlice";

const Skills: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: IUserSelector) => state.user);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [newSkill, setNewSkill] = useState<string>("");
  const [skills, setSkills] = useState<string[]>(user?.skills);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    // Reset the input field and validation error when closing the modal
    setNewSkill("");
    setValidationError(null);
  };

  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skillValue = e.target.value;

    // Validation checks
    if (!skillValue.trim()) {
      setValidationError("Skill is required");
    } else if (/\d/.test(skillValue)) {
      setValidationError("Numbers are not allowed");
    } else if (/^\s|\s$/.test(skillValue)) {
      setValidationError(
        "White spaces are not allowed at the beginning or the end"
      );
    } else {
      setValidationError(null);
    }

    setNewSkill(skillValue);
  };

  const handleSkillSubmission = (updatedSkills: string[]) => {
    let dataToSend = {
      userId: user?._id,
      skills: updatedSkills ?? [],
    };
    dispatch(submitViewProfileUpdations(dataToSend));
  };

  const handleSubmit = () => {
    if (!validationError && newSkill.trim()) {
      setSkills((prevSkills) => {
        const updatedSkills = [...prevSkills, newSkill];
        handleSkillSubmission(updatedSkills);
        return updatedSkills;
      });
      handleCloseModal();
    } else {
      console.error(
        validationError,
        "Validation error: Please correct the skill input"
      );
    }
  };


  const handleRemoveSkill = (index: number) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
  
    setSkills(() => {
      if (updatedSkills.length === 0) {
        handleSkillSubmission([]);
      } else {
        console.log("calling .....", updatedSkills);
        handleSkillSubmission(updatedSkills);
      }

      return updatedSkills;
    });
  };


  
  return (
    <div className="w-full md:w-10/12 mx-auto mt-5 border p-5">
      <div className="flex justify-between items-center font-semibold text-gray-700">
        <h1 className="underline">Skills</h1>
        <FiEdit className="text-md text-blue-600" onClick={handleOpenModal} />
      </div>
      <div className="flex flex-wrap mt-3">
        <div className="flex gap-2 flex-wrap">
          {/* Skill items */}
          {skills && skills.length > 0 ? (
            skills.map((skill, indx) => (
              <div
                key={indx}
                className="border-2 border-gray-600 rounded-xl flex items-center p-1"
              >
                <h1 className="text-sm font-semibold">{skill}</h1>
                <div className="px-1 py-1">
                  <RxCross2
                    className="hover:scale-125 hover:font-bold hover:shadow-xl hover:text-red-600 cursor-pointer"
                    onClick={() => handleRemoveSkill(indx)}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 w-full mt-4 text-center">
              No skills added
            </div>
          )}
        </div>
      </div>

      {/* Modal for Skills */}
      <ModalBox isOpen={isOpen} onClose={handleCloseModal}>
        <div className="w-full">
          <h2 className="text-md text-start mx-6 my-2 text-gray-900 font-semibold font-sans underline">
            Skills
          </h2>
          {/* Include your skill input fields here */}
          <div className="flex justify-center items-center">
            {/* Skill input field */}
            <input
              type="text"
              placeholder="Enter a skill"
              className={`w-11/12 p-1 border-2 rounded-lg h-auto ${
                validationError ? "border-red-500" : ""
              }`}
              value={newSkill}
              onChange={handleSkillChange}
            />
          </div>
          {validationError && (
            <div className="text-red-500 text-sm mx-6 mt-1">
              {validationError}
            </div>
          )}
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

export default Skills;
