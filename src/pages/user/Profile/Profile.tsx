import NavBar from "@/components/user/Home/NavBar";
import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdWork, MdEmail, MdOutlinePhoneAndroid } from "react-icons/md";
import { BiCalendar } from "react-icons/bi";
import { submitUserProfilePic, fetchUser } from "@/redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { IUserSelector } from "@/interface/IUserSlice";
import { toast } from "react-toastify";
import { submitBasicDetials } from "@/redux/actions/userActions";
import MiniDash from "../../../components/user/Profile/MiniDash";
import DatePicker from "react-datepicker";
import ModalBox from "@/components/common/ModalBox";
import ProfileSideBar from "@/components/user/Profile/ProfileSideBar";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";

const Profile: React.FC = () => {
  const [_, setProfilePic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const [_, setLocation] = useState("Not Available");
  // const [jobTitle, setJobTitle] = useState("Not Available");
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: IUserSelector) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await dispatch(fetchUser(user?._id));
        // console.log("User data fetched:", response);
        const userData = response.payload.data;
        setFormData({
          phoneNumber: userData?.phoneNumber || "",
          dob: userData?.dob || "",
          location: userData?.location || "",
          position: userData?.position || "",
          _id: userData?._id || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); //
  }, [dispatch, user?._id, toast]);

  const handleProfilePicChange = async (e: any) => {
    setIsLoading(true);

    const file = e.target.files[0];

    if (file) {
      try {
        const imageUrl = file;
        const formData = new FormData();
        formData.append("file", imageUrl);
        formData.append("upload_preset", "wx0iwu8u");

        const cloudinaryResponse = await fetch(
          "https://api.cloudinary.com/v1_1/dato7wx0r/upload",
          {
            method: "post",
            body: formData,
          }
        );

        const cloudinaryData = await cloudinaryResponse.json();

        setProfilePic(cloudinaryData.url);

        let dataTosend = {
          userId: user._id,
          profilePic: cloudinaryData.url,
        };
        // Update the Redux store with the new profile picture
        const data = await dispatch(submitUserProfilePic(dataTosend));
        console.log("🚀 ~ file: Profile.tsx:84 ~ handleProfilePicChange ~ data:", data)

        // Manually fetch the user data after the successful upload
        const userData = await dispatch(fetchUser(user?._id));

        console.log("User data fetched:", userData);

        toast.success("Profile picture updated successfully");
      } catch (error : any ) {
        console.log("Error uploading file:", error.message);
        toast.error("Error updating profile picture");
      }
    }

    setIsLoading(false);
  };

  const handleEditBasicDetails = () => {
    setIsModalOpen(true);
  };
  console.log(handleEditBasicDetails)
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const [formData, setFormData] = useState({
    phoneNumber: "",
    dob: "",
    location: "",
    position: "",
    _id: "",
  });
  const [formErrors, setFormErrors] = useState<any>({
    phoneNumber: "",
    dob: "",
    location: "",
    position: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const newErrors: { [key: string]: string } = {};

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number format";
    }

    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData?.position.trim()) {
      newErrors.position = "Profession is required";
    }

    if (Object.keys(newErrors).length === 0) {
      formData._id = user?._id;
      const data = dispatch(submitBasicDetials(formData));
      console.log("Form submitted::::::::: === ", data);
      handleClose();
      toast.success("Profile details updated successfully");
    } else {
      setFormErrors(newErrors);
      toast.error("Error updating profile details");
    }

    setIsLoading(false);
  };

  return (
    <div>
      <NavBar />
      {isLoading && (
        <div className="loading-overlay z-50">
          <div className="loading-spinner"></div>
        </div>
      )}
      <div className="h-full w-full bg-green-200 ">
        <div className="flex justify-center items-center">
          <div className="w-full ms-10 md:ms-0 h-full md:w-11/12 bg-white  flex-col md:flex-row shadow-lg md:h-48 m-5 rounded-lg flex justify-between items-center">
            <div className="flex justify-center md:flex-row md:w-3/12 w-full items-center">
              <div className="md:w-2/6 flex ms-12  justify-center items-center">
                <label
                  htmlFor="profilePicInput"
                  className="relative flex items-center justify-center"
                >
                  <img
                    src={
                      user?.profilePic ||
                      "https://www.kasandbox.org/programming-images/avatars/old-spice-man-blue.png"
                    }
                    className="rounded-full w-auto md:w-auto md:h-32 mx-12 border-black border"
                    alt=""
                  />
                  <div className="-p-3 relative -left-24 flex justify-start">
                    <FiEdit className="w-7 bg-gray-50 hover text-blue-800 border-gray-500 rounded-full relative top-4 left-10 h-6" />
                  </div>
                </label>
                <input
                  id="profilePicInput"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleProfilePicChange}
                />
              </div>
            </div>
            <div className="m-4 md:ms-10 md:m-4 md:w-5/6">
              <div className="flex flex-col gap-2">
                <div>
                  <h1 className="font-bold font-sans text-2xl">
                    {user?.userName || "N/A"}
                  </h1>
                  <p className="text-xs md:text-sm text-gray-600">
                    Profile Last Updated on{" "}
                    {new Date(user?.updatedAt).toLocaleDateString() || "N/A"}
                  </p>
                </div>
                <div className="w-full h-[0.2px] bg-black"></div>
              </div>
              <div className="w-4/5 mt-1 flex justify-around gap-3">
                <div className="w-full flex flex-col border-e-[1px] border-black text-sans text-gray-500 text-sm">
                  <div className="flex items-center justify-start gap-4 mb-2">
                    <FaLocationArrow />
                    {user?.location || "Not Available "}
                  </div>
                  <div className="flex items-center justify-start gap-4 mb-2">
                    <MdWork />
                    {user?.position || "Not Available "}
                  </div>
                  <div className="flex items-center justify-start gap-4 mb-2">
                    <MdEmail />
                    {user?.email}
                  </div>
                </div>
                <div className="w-1/2 mt-1">
                  <div className="w-full flex flex-col h-10 border-black text-sans text-gray-500 text-sm">
                    <div className="flex w-40 items-center justify-start gap-4 mb-2 ms-5">
                      <MdOutlinePhoneAndroid className="text-sm" />
                      {user?.phoneNumber}
                    </div>
                    <div className="flex w-40 items-center justify-start gap-4 mb-2 ms-5">
                      <BiCalendar className="text-xs md:text-sm" />
                      {new Date(user?.dob).toLocaleDateString() || "N/A"} -DOB
                    </div>
                    <div className="flex w-40 items-center justify-start gap-4 mb-2 ms-5">
                      <div
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center bg-gray-500 hover:bg-gray-700  rounded-md gap-2"
                      >
                        <FiEdit className="text-white ms-2" />
                        <div className="font-mono font-semibold text-white px-2 py-1 rounded-md">
                          Update Details
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-orange-200 h-40 rounded w-10/12 my-2 mx-2 mr-5 flex justify-start">
              <MiniDash />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-auto  ">
        <div className="h-auto m-3">
          <ProfileSideBar />
        </div>
        <div className="flex justify-center rounded-xl items-start h-full w-full">
          <div className="w-11/12 h-full  rounded-l shadow-lg bg-white ">
            <Outlet />
          </div>
        </div>
      </div>
      <ModalBox onClose={handleClose} isOpen={isModalOpen}>
        <div className="max-w-md mx-auto mt-4 p-6 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-600"
              >
                Phone Number:
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  formErrors.phoneNumber ? "border-red-500" : "border-gray-300"
                }`}
              />
              <span className="error text-red-600 font-semibold text-sm">
                {formErrors.phoneNumber}
              </span>
            </div>
            <div className="mb-4">
              <label
                htmlFor="dob"
                className="block text-sm font-medium text-gray-600"
              >
                Date of Birth:
              </label>
              <DatePicker
                id="dob"
                name="dob"
                selected={formData.dob ? new Date(formData.dob) : null}
                onChange={(date: Date) =>
                  handleInputChange({
                    target: { name: "dob", value: "" + date },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
                dateFormat="MM/dd/yyyy"
                className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  formErrors.dob ? "border-red-500" : "border-gray-300"
                }`}
              />
              <span className="error text-red-600 font-semibold text-sm">
                {formErrors.dob}
              </span>
            </div>
            <div className="mb-4">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-600"
              >
                Location:
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  formErrors.location ? "border-red-500" : "border-gray-300"
                }`}
              />
              <span className="error text-red-600 font-semibold text-sm">
                {formErrors.location}
              </span>
            </div>
            <div className="mb-4">
              <label
                htmlFor="position"
                className="block text-sm font-medium text-gray-600"
              >
                Profession:
              </label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  formErrors.position ? "border-red-500" : "border-gray-300"
                }`}
              />
              <span className="error text-red-600 font-semibold text-sm">
                {formErrors.position}
              </span>
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </form>
        </div>
      </ModalBox>
    </div>
  );
};

export default Profile;
