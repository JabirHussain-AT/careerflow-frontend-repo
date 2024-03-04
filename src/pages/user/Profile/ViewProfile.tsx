import React, { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import Skills from "@/components/user/Profile/Skills";
import Experience from "@/components/user/Profile/Experiance";
import Education from "@/components/user/Profile/Education";
import AboutMe from "@/components/user/Profile/AboutMe";
import SocialMediaLinks from "@/components/user/Profile/SocialMediaLinks";
import { IUserSelector, UserState } from "@/interface/IUserSlice";
import { useSelector, useDispatch } from "react-redux";
import { submitViewProfileUpdations } from "@/redux/actions/userActions";
import { toast } from "react-toastify";
import { AppDispatch } from "@/redux/store";

const ViewProfile: React.FC = () => {
  const [resumeVisible, setResumeVisible] = useState<boolean>(false);
  const [resume, setResume] = useState<File | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showResume, setShowResume] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { user } = useSelector((state: IUserSelector) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleResumeUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files && event.target.files[0];

    if (selectedFile) {
      try {
        toast.loading("Uploading resume...");
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", "wx0iwu8u");

        // Upload resume to Cloudinary
        const cloudinaryResponse = await fetch(
          "https://api.cloudinary.com/v1_1/dato7wx0r/upload",
          {
            method: "post",
            body: formData,
          }
        );

        const cloudinaryData = await cloudinaryResponse.json();
        console.log(cloudinaryData, "8888");
        setResumeUrl(cloudinaryData.secure_url);
        setResume(selectedFile);
        let dataToSubmit = {
          userId: user?._id,
          resume: cloudinaryData.secure_url,
        };
        dispatch(submitViewProfileUpdations(dataToSubmit));
        toast.dismiss(); // Dismiss the loading toast
        setResumeVisible(true);
      } catch (error: any) {
        console.error("Error uploading resume:", error.message);
        toast.error("Error uploading resume");
      }
    }
  };

  const openResume = () => {
    setResumeVisible(true);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="min-h-screen rounded-2xl bg-gray-50 flex flex-col justify-between">
      <div className="m-4">
        <h1 className="text-2xl font-bold">
          My <span className="text-blue-500">Profile</span>
        </h1>
      </div>
      <div className="w-full h-0.5 bg-black"></div>

      {/* Resume Section */}
      <div className="w-full md:w-10/12 mx-auto mt-5 border p-5">
        <div className="flex justify-between items-center font-semibold text-gray-700">
          <h1 className="underline">Resume</h1>
          <FiEdit
            className="text-md text-blue-600 cursor-pointer"
            onClick={toggleEditing}
          />
        </div>
        <div className="flex flex-wrap mt-3">
          {isEditing && (
            // Resume Upload Input
            <input
              type="file"
              accept=".pdf, .doc, .docx"
              onChange={handleResumeUpload}
              className="mt-2"
            />
          )}

          {/* { !resumeVisible && user?.resume && (
            // Display uploaded resume in iframe
            <div className="mt-3 w-full md:w-full justify-end border p-3">
              {!resumeVisible ? (
                <iframe
                  src={user?.resume}
                  width="100%"
                  height="600"
                  title="Resume"
                />
              ) : (
                <iframe
                  src={user?.resume}
                  width="10%"
                  height="60"
                  title="Resume"
                />
              )}
              <button
                className="mt-3 text-sm text-blue-500 cursor-pointer"
                onClick={openResume}
              >
                View Resume
              </button>
            </div>
          )} */}

          {showResume ? (
            <>
              <iframe
                src={user?.resume}
                width="100%"
                height="600"
                title="Resume"
              />
            </>
          ) : (
            <></>
          )}
          <h1
            className="cursor-pointer hover:text-white hover:scale-110 font-semibold text-sm bg-blue-600 text-white px-2 py-1  rounded-md mt-4"
            onClick={() => setShowResume(!showResume)}
          >
            {showResume ? "Hide" : "show"} resume
          </h1>

          {!resumeVisible && !user?.resume === undefined && (
            // Display message for no resume uploaded
            <p className="text-sm text-sans text-pretty mt-3">
              No resume uploaded
            </p>
          )}

          {/* Loading indicator */}
          {loading && (
            <p className="text-sm text-sans text-gray-500 mt-3">Uploading...</p>
          )}
        </div>
      </div>

      {/* About Me Section */}
      <AboutMe />

      {/* Skills Section */}
      <Skills />

      {/* Experience Section */}
      <Experience />

      {/* Education Section */}
      <Education />

      {/* Social Media Links */}
      <SocialMediaLinks />
    </div>
  );
};

export default ViewProfile;
