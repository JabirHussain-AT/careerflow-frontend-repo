import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaHome,
  FaAlgolia,
  FaUser,
  FaFacebookMessenger ,
   FaCalendarAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import Logo from "../../../assets/CareerFlow-Logo.png";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/reducers/user/userSlice";

const CompanySidebar: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log("its here in logout");
    dispatch(logout());
  };

  return (
    <>
      <div className="w-full h-12 bg-white shadow-lg  ">
        <div className="flex justify-start items-center">
          <img className="w-32 p-2" src={Logo} alt="Logo" />
        </div>
      </div>
      <div className="flex">
        <div className="lg:w-64 h-screen bg-white  rounded text-black lg:flex-shrink-0">
          <ul className="text-black font-sans px-2 font-semibold lg:flex-col lg:w-full">
            <NavLink
              to={"/company/dashboard"}
              className={({ isActive }) => {
                return `lg:w-full py-3 px-5 w-1/2 text-black rounded-md hover:bg-blue-500 hover:text-white border-b-2 flex gap-2 items-center mt-2${
                  isActive ? " text-white bg-blue-500" : ""
                } `;
              }}
            >
              <FaHome /> Dashboard
            </NavLink>
            <NavLink
              to={"/company/jobs"}
              className={({ isActive }) => {
                return `lg:w-full py-3 px-5 w-1/2 text-gray-600  rounded-md hover:bg-blue-500 hover:text-white border-b-2 flex gap-2 items-center mt-2 ${
                  isActive ? `text-white bg-blue-500` : ""
                }`;
              }}
            >
              <  FaAlgolia /> Jobs
            </NavLink>
            <NavLink
              to={"/company/job-applications"}
              className={({ isActive }) => {
                return `lg:w-full py-3 px-5 w-1/2 text-gray-600 rounded-md hover:bg-blue-500 hover:text-white border-b-2 flex gap-2 items-center mt-2 ${
                  isActive ? `text-white bg-blue-500` : ""
                }`;
              }}
            >
              <FaUser /> Job Applications
            </NavLink>
            <NavLink
              to={"/company/messages"}
              className={({ isActive }) => {
                return `lg:w-full py-3 px-5 w-1/2 text-gray-600 rounded-md hover:bg-blue-500 hover:text-white border-b-2 flex gap-2 items-center mt-2 ${
                  isActive ? `text-white bg-blue-500` : ""
                }`;
              }}
            >
              <FaFacebookMessenger /> Messages
            </NavLink>
            <NavLink
              to={"/company/schedules"}
              className={({ isActive }) => {
                return `lg:w-full py-3 px-5 w-1/2 text-gray-600  rounded-md hover:bg-blue-500 hover:text-white border-b-2 flex gap-2 items-center mt-2 ${
                  isActive ? `text-white bg-blue-500` : ""
                }`;
              }}
            >
              <FaCalendarAlt /> Schedules
            </NavLink>
          </ul>
          <div className="">
            <ul>
              <li
                onClick={handleLogout}
                className="lg:w-full py-3 px-2 w-1/2  rounded-md hover:bg-red-200 font-semibold hover:text-red-800 border-b-2 flex gap-2 items-center mt-2"
              >
                <FaSignOutAlt /> Logout
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full bg-gray-100">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default CompanySidebar;
