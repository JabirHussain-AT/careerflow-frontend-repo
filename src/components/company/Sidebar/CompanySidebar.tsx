import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaHome,
  FaAlgolia,
  FaUser,
  FaFacebookMessenger,
  FaCalendarAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { BsArrowLeftCircle } from "react-icons/bs";
import Logo from "../../../assets/CareerFlow-Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/reducers/user/userSlice";
import { IUserSelector } from "@/interface/IUserSlice";

const CompanySidebar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(true);
  const { user } = useSelector((state: IUserSelector) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log("its here in logout");
    dispatch(logout());
  };

  return (
    <>
      {/* <div className="w-full h-12 bg-white shadow-lg  ">
        
      </div> */}
      <div>
      {user?.approved && user?.approved === true ?
      <div className="flex  overflow-y-auto  ">
        <div
          className={`${
            open ? "lg:w-64  " : "lg:w-20 max-w-20 fixed "
          } h-screen bg-sky-950 rounded text-black   duration-300 lg:flex-shrink-0`}
        >
          <div className={`${ open ? "w-full bg-white" : ""} duration-300 flex justify-start items-center`}>
            <img className={`${ open ? "w-28 mx-auto" : "w-28" } bg-white rounded-md p-2`} src={Logo} alt="Logo" />
          </div>
          <div className="flex justify-end  relative -right-5 p-2">
            <BsArrowLeftCircle
              onClick={() => setOpen(!open)}
              className={`${
                !open && "rotate-180"
              } bg-white hover:bg-blue-400 rounded-full cursor-pointer text-3xl hover:border-blue-400 border-transparent`}
            />
          </div>
          <ul className="text-black font-sans px-2 font-semibold lg:flex-col lg:w-full">
            <NavLink
              to={"/company/dashboard"}
              className={({ isActive }) => {
                return `lg:w-full py-3 px-5  text-white rounded-md hover:bg-blue-500 hover:text-white border-b-2 flex gap-2 items-center mt-2${
                  isActive ? " text-white bg-blue-500" : ""
                } `;
              }}
            >
              <FaHome className={`${open && "-right-10"}`} /> {open && <span>Dashboard</span>}
            </NavLink>
            <NavLink
              to={"/company/jobs"}
              className={({ isActive }) => {
                return `lg:w-full py-3 px-5 -white text-white   rounded-md hover:bg-blue-500 hover:text-white border-b-2 flex gap-2 items-center mt-2 ${
                  isActive ? `text-white bg-blue-500` : ""
                }`;
              }}
            >
              <FaAlgolia />
              {open && <span>Jobs</span>}
            </NavLink>
            {/* <NavLink
              to={"/company/job-applications"}
              className={({ isActive }) => {
                return `lg:w-full py-3 px-5  text-white rounded-md hover:bg-blue-500 hover:text-white border-b-2 flex gap-2 items-center mt-2 ${
                  isActive ? `text-white bg-blue-500` : ""
                }`;
              }}
            >
              <FaUser /> {open && <span>Job Applications</span>}
            </NavLink> */}
            <NavLink
              to={"/company/messages"}
              className={({ isActive }) => {
                return `lg:w-full py-3 px-5  text-white rounded-md hover:bg-blue-500 hover:text-white border-b-2 flex gap-2 items-center mt-2 ${
                  isActive ? `text-white bg-blue-500` : ""
                }`;
              }}
            >
              <FaFacebookMessenger /> {open && <span> Messages </span>}
            </NavLink>
            <NavLink
              to={"/company/schedules"}
              className={({ isActive }) => {
                return `lg:w-full py-3 px-5  text-white  rounded-md hover:bg-blue-500 hover:text-white border-b-2 flex gap-2 items-center mt-2 ${
                  isActive ? `text-white bg-blue-500` : ""
                }`;
              }}
            >
              <FaCalendarAlt /> {open && <span> Schedules</span>}
            </NavLink>
          </ul>
          <div className="">
            <ul>
              <li
                onClick={handleLogout}
                className="lg:w-full py-3 px-2   rounded-md text-white  hover:bg-red-200 font-semibold hover:text-red-800 border-b-2 flex gap-2 items-center mt-2"
              >
                <FaSignOutAlt /> {open && <span> Logout </span>}
              </li>
            </ul>
          </div>
        </div>
        <div className={`w-full ${open ? ' ' : 'ml-20'} bg-gray-100}`}>
          <Outlet />
        </div>
      </div>
      :
      <div>
         <div className={`w-full ${open ? ' ' : 'ml-20'} bg-gray-100}`}>
          <Outlet />
        </div>
      </div>
            }
      </div>
    </>
  );
};

export default CompanySidebar;
