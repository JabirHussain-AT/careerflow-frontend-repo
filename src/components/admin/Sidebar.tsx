import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaHome,
  FaBuilding,
  FaUser,
  FaPaypal,
  FaSignOutAlt,
  FaCapsules
} from "react-icons/fa";
import Logo from "../../assets/CareerFlow-Logo.png";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/reducers/user/userSlice";





const Sidebar : React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log("its here in logout");
    dispatch(logout());
  };


  
  return (
    <>
      <div className="w-full h-12 bg-white shadow-md">
        <div className="flex justify-start items-center">
          <img className="w-32 p-2" src={Logo} alt="Logo" />
        </div>
      </div>
      <div className="flex">
        <div className="lg:w-64 h-screen bg-white shadow-lg rounded text-black lg:flex-shrink-0">
          <ul className="text-black font-sans px-2 font-semibold lg:flex-col lg:w-full">
            <NavLink
              to={"/admin/dashboard"}
              className={({ isActive }) => {
                return `lg:w-full py-3 px-5 w-1/2 text-black rounded-md hover:bg-blue-500 hover:text-white border-b-2 flex gap-2 items-center mt-2${
                  isActive ? " text-white bg-blue-500" : ""
                } `;
              }}
            >
              <FaHome /> Dashboard
            </NavLink>
            <NavLink
              to={"/admin/company-approval "}
              className={({ isActive }) => {
                return `lg:w-full py-3 px-5 w-1/2 text-black rounded-md hover:bg-blue-500 hover:text-white border-b-2 flex gap-2 items-center mt-2 ${
                  isActive ? `text-white bg-blue-500` : ""
                }`;
              }}
            >
              <FaBuilding /> Companies
            </NavLink>
       


            <NavLink
              to={"/admin/categories "}
              className={({ isActive }) => {
                return `lg:w-full py-3 px-5 w-1/2 text-black rounded-md hover:bg-blue-500 hover:text-white border-b-2 flex gap-2 items-center mt-2 ${
                  isActive ? `text-white bg-blue-500` : ""
                }`;
              }}
            >
              <FaCapsules /> Categories
            </NavLink>

            <NavLink
              to={"/admin/users "}
              className={({ isActive }) => {
                return `lg:w-full py-3 px-5 w-1/2 text-black rounded-md hover:bg-blue-500 hover:text-white border-b-2 flex gap-2 items-center mt-2 ${
                  isActive ? `text-white bg-blue-500` : ""
                }`;
              }}
            >
              <FaBuilding /> Users
            </NavLink>

            <li className="lg:w-full py-3 px-5 w-1/2 text-black rounded-md hover:bg-blue-500 hover:text-white border-b-2 flex gap-2 items-center mt-2">
              <FaPaypal /> Payment
            </li>
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

export default Sidebar;
