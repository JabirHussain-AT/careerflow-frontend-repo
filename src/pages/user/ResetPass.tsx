import React, { useState } from "react";
import NavBar from "@/components/user/Login/NavBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { resetPass } from "@/redux/actions/userActions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPass: React.FC = () => {
  const [userEmail, setUserEmail] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [resetUserSuccess, setResetUserSuccess] = useState(false);
  const [resetCompanySuccess, setResetCompanySuccess] = useState(false);
  const [userError, setUserError] = useState("");
  const [companyError, setCompanyError] = useState("");
  const [selectedTab, setSelectedTab] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleUserResetPassword = async () => {
    if (!validateEmail(userEmail)) {
      setUserError("Please enter a valid email address.");
      return;
    }

    try {
      const res = await dispatch(resetPass(userEmail));
      const message = res.payload?.message;
      if (res.payload.success === false) {
        toast.error(message); // Show success toast
      }else{

        toast.success('password reset successfull');
        setResetUserSuccess(true);
      }
    } catch (error) {
      const message = "An error occurred";
      toast.error(message); // Show error toast
    }
  };

  const handleCompanyResetPassword = () => {
    if (!validateEmail(companyEmail)) {
      setCompanyError("Please enter a valid email address.");
      return;
    }

    // Simulate sending password reset email
    console.log(`Sending password reset email to ${companyEmail}`);
    setResetCompanySuccess(true); // Set resetCompanySuccess to true
  };

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div>
      <NavBar />
      <Tabs defaultValue="password" className="max-w-lg mx-auto mt-8">
        <TabsList className="flex justify-center">
          <TabsTrigger value="user" onClick={() => handleTabChange("user")}>
            User
          </TabsTrigger>
          <TabsTrigger
            value="company"
            onClick={() => handleTabChange("company")}
          >
            Company
          </TabsTrigger>
        </TabsList>
        {selectedTab === "" && (
          <div className="text-center text-red-500 font-bold mt-4">
            Please select either User or Company tab.
          </div>
        )}
        <TabsContent value="user" className="p-4">
          <div className="bg-blue-200 text-black p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Reset User Password</h2>
            <p className="mb-4">
              Please enter your email address to reset your password.
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 mb-4 rounded border-none bg-gray-100 focus:outline-none focus:bg-white"
              value={userEmail}
              onChange={(e) => {
                setUserEmail(e.target.value);
                setUserError("");
              }}
            />
            {userError && <p className="text-red-500 mb-4">{userError}</p>}
            <button
              className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-100 transition-colors duration-300"
              onClick={handleUserResetPassword}
            >
              Reset Password
            </button>
            {resetUserSuccess && (
              <div className="bg-green-100 text-green-800 mt-4 px-4 py-2 rounded">
                <p>Check Your email and use that password for login </p>
                <p>Change the password Immediatly throgh your profile.</p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="company" className="p-4">
          <div className="bg-blue-200 text-black p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">
              Reset Company Password
            </h2>
            <p className="mb-4">
              Please enter your email address to reset your password.
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 mb-4 rounded border-none bg-gray-100 focus:outline-none focus:bg-white"
              value={companyEmail}
              onChange={(e) => {
                setCompanyEmail(e.target.value);
                setCompanyError("");
              }}
            />
            {companyError && (
              <p className="text-red-500 mb-4">{companyError}</p>
            )}
            <button
              className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-100 transition-colors duration-300"
              onClick={handleCompanyResetPassword}
            >
              Reset Password
            </button>
            {resetCompanySuccess && (
              <div className="bg-green-100 text-green-800 mt-4 px-4 py-2 rounded">
                <p>Check Your email and use that password for login </p>
                <p>Change the password Immediatly throgh your profile.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResetPass;
