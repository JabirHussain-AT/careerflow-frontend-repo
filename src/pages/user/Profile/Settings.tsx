import React, { useState } from "react";
import { changePass } from "@/redux/actions/userActions";
import zxcvbn from "zxcvbn";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Settings: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0); // State for password strength
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleOldPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newPasswordValue = e.target.value;
    setNewPassword(newPasswordValue);
    // Estimate password strength using zxcvbn
    const strengthScore = zxcvbn(newPasswordValue).score;
    setPasswordStrength(strengthScore);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (newPassword.trim() !== confirmPassword.trim()) {
      setErrorMessage("New password and confirm password do not match.");
      return;
    }

    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(newPassword)) {
      setErrorMessage(
        "Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character."
      );
      return;
    }

    const res = await dispatch(changePass({ oldPassword, newPassword }));
    if (res?.payload?.success === true) {
      toast.success(res.payload.message);
    } else {
      toast.error(res.payload.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Change Password   : </h2>
        <button
          onClick={() => setShowChangePassword(!showChangePassword)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 mb-4"
        >
          {showChangePassword ? "Hide Change Password" : "Change Password"}
        </button>
        {showChangePassword && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="oldPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Old Password:
              </label>
              <input
                type="password"
                id="oldPassword"
                value={oldPassword}
                onChange={handleOldPasswordChange}
                required
                className="mt-1 p-2 w-full rounded border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password:
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={handleNewPasswordChange}
                required
                className="mt-1 p-2 w-full rounded border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {/* Password strength meter */}
              <div className="text-xs text-gray-500 mt-1">
                Password Strength: {passwordStrength}
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                className="mt-1 p-2 w-full rounded border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {errorMessage && (
              <p className="text-red-500 mb-4">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
            >
              Change Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Settings;
