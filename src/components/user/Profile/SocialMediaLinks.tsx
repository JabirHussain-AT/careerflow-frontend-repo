import React, { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import ModalBox from "@/components/common/ModalBox"; // Replace with the correct path
import { submitViewProfileUpdations } from "@/redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { IUserSelector } from "@/interface/IUserSlice";

interface SocialLink {
  link?: string;
  socialMedia?: string;
}

const SocialMediaLinks: React.FC = () => {
  const { user } = useSelector((state: IUserSelector) => state.user);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(user?.socialMediaLinks);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [modalLink, setModalLink] = useState<string>("");
  const [modalSocialMedia, setModalSocialMedia] = useState<string>("");
  const [isAddingSocialLink, setIsAddingSocialLink] = useState<boolean>(false);

  const isUrlValid = (url: string): boolean => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
  };

  const handleOpenModal = () => {
    setIsAddingSocialLink(true);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddingSocialLink(false);
    setIsOpen(false);
    setValidationError(null);
    setModalLink("");
    setModalSocialMedia("");
  };

  const handleSubmit = () => {
    let dataToSubmit = {
      userId: user?._id,
      socialMediaLinks: socialLinks.filter((link) => link.link && link.socialMedia),
    };

    dispatch(submitViewProfileUpdations(dataToSubmit));
    console.log("Submitted:", dataToSubmit);
    handleCloseModal();
  };

  const handleModalSubmit = () => {
    if (!modalLink || !modalSocialMedia) {
      setValidationError("Please enter both link and social media.");
      return;
    }

    if (!isUrlValid(modalLink)) {
      setValidationError("Please enter a valid URL.");
      return;
    }

    setSocialLinks((prevSocialLinks) => [
      ...prevSocialLinks,
      { link: modalLink, socialMedia: modalSocialMedia },
    ]);

    setModalLink("");
    setModalSocialMedia("");
    setValidationError(null);

    setIsOpen(false);
    setIsAddingSocialLink(false);
  };

  useEffect(() => {
    if (socialLinks.length > 0) {
      handleSubmit();
    }
  }, [socialLinks]);

  return (
    <div className="w-full md:w-10/12 mx-auto mt-5 border p-5">
      <div className="flex justify-between items-center font-semibold text-gray-700">
        <h1 className="underline">Social Media Links </h1>
        <FiEdit
          onClick={handleOpenModal}
          className="text-md text-blue-600 cursor-pointer"
        />
      </div>
      <div id="social-links" className="text-sm text-sans text-pretty mt-3">
        <ul className="list-disc pl-4">
          {socialLinks.map((link, index) => (
            <li key={index} className="flex space-x-2 gap-5">
              <strong>{link.socialMedia}:</strong>{" "}
              <a
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-800 underline"
              >
                {link.link}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <ModalBox isOpen={isOpen} onClose={handleCloseModal}>
        <div className="w-full">
          <h2 className="text-md text-start mx-6 my-2 text-gray-900 font-semibold font-sans underline">
            {isAddingSocialLink
              ? "Add Social Media Link"
              : "Social Media Links"}
          </h2>
          <div className="flex justify-center items-center">
            {isAddingSocialLink ? (
              <>
                <input
                  type="text"
                  placeholder="Social Media"
                  value={modalSocialMedia}
                  onChange={(e) => setModalSocialMedia(e.target.value)}
                  className="border p-2 m-5 rounded-lg"
                />
                <input
                  type="url"
                  placeholder="Link"
                  value={modalLink}
                  onChange={(e) => setModalLink(e.target.value)}
                  className="border p-2 rounded-lg mr-2"
                />
              </>
            ) : (
              <>
                {socialLinks.map((link, index) => (
                  <p
                    key={index}
                  >{`Link: ${link.link}, Social Media: ${link.socialMedia}`}</p>
                ))}
              </>
            )}
          </div>
          {validationError && (
            <div className="text-red-500 text-sm mx-6 mt-1">
              {validationError}
            </div>
          )}
          <div className="flex justify-end m-5">
            {isAddingSocialLink ? (
              <button
                className={`bg-blue-900 rounded-lg px-3 py-2 font-sans text-md text-white ${
                  validationError ? "cursor-not-allowed" : ""
                }`}
                onClick={handleModalSubmit}
                disabled={validationError !== null}
              >
                Add Social Link
              </button>
            ) : (
              <button
                className={`bg-blue-900 rounded-lg px-3 py-2 font-sans text-md text-white ${
                  validationError ? "cursor-not-allowed" : ""
                }`}
                onClick={handleSubmit}
                disabled={validationError !== null}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </ModalBox>
    </div>
  );
};

export default SocialMediaLinks;
