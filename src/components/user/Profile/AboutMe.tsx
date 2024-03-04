import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import ModalBox from "@/components/common/ModalBox";
import { submitViewProfileUpdations } from "@/redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { IUserSelector } from "@/interface/IUserSlice";

const AboutMe: React.FC = () => {
  const { user } = useSelector((state: IUserSelector) => state.user);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const [aboutMeContent, setAboutMeContent] = useState<string>(
    user?.about!
  );
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setValidationError(null); // Clear validation error when closing the modal
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    setAboutMeContent(content);

    // Validate the textarea content (minimum length)
    if (content.length < 10) {
      setValidationError("Please enter at least 10 characters.");
    } else {
      setValidationError(null);
    }
  };

  const handleSubmit = () => {
    // Validate before submission
    if (aboutMeContent.length < 10) {
      setValidationError("Please enter at least 10 characters.");
      return; // Prevent submission if validation fails
    }

    // Handle submission logic here
    let dataToSubmit = {
      userId: user?._id,
      about: aboutMeContent,
    };
    dispatch(submitViewProfileUpdations(dataToSubmit));
    console.log("Submitted:", aboutMeContent);
    handleCloseModal();
  };

  return (
    <div className="w-full md:w-10/12 mx-auto mt-5 border p-5">
      <div className="flex justify-between items-center font-semibold text-gray-700">
        <h1 className="underline">About Me</h1>
        <FiEdit onClick={handleOpenModal} className="text-md text-blue-600" />
      </div>
      <div id="aboutme-content" className="text-sm text-sans text-pretty mt-3">
        <p className="leading-7">{ user?.about }</p>
      </div>
      <ModalBox isOpen={isOpen} onClose={handleCloseModal}>
        <div className="w-full">
          <h2 className="text-md text-start mx-6 my-2 text-gray-900 font-semibold font-sans underline">
            About Me
          </h2>
          <div className="flex justify-center items-center">
            <textarea
              maxLength={1000}
              minLength={1}
              required
              className={`w-11/12 p-1 border-2 rounded-lg h-56 ${
                validationError ? "border-red-500" : ""
              }`}
              value={aboutMeContent}
              onChange={handleTextareaChange}
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

export default AboutMe;
