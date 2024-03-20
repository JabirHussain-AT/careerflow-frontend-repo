import React, { useState } from "react";
import Logo from "../../../assets/CareerFlow-Logo.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/reducers/user/userSlice";

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [ moreDropDown, setMoreDropDown] = useState<boolean>(false);
  const handleLogout = () => {
    dispatch(logout());
  };

  const handleDropdownClick = (route: string) => {
    navigate(route);
    setShowDropdown(false); // Close the dropdown after clicking an option
  };

  const handleMoreClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    // Close dropdown if clicked outside of it
    const target = e.target as HTMLElement;
    const dropdown = document.getElementById("dropdown");
    if (dropdown && !dropdown.contains(target)) {
      setShowDropdown(false);
    }
  };

  const handleMoreDropDown = () => {
    console.log('hey')
    setMoreDropDown(!moreDropDown)
  };

  return (
    <div
      className="flex flex-col sm:flex-row justify-between mx-auto md:h-12 bg-white shadow-lg h-aut w-full"
      onClick={handleOutsideClick}
    >
      <div className="flex items-center justify-between">
        <div className="h-9 mb-2 flex cursor-pointer" onClick={() => navigate("/")}>
          <img className="h-9 pt-2 pl-2 mx-auto hover" src={Logo} alt="Logo" />
        </div>
        <div className="sm:hidden">
          <button
            className="px-4 py-2 text-blue-700 cursor-pointer font-mono text-sm"
            onClick={handleMoreClick}
            aria-haspopup="true"
            aria-expanded={showDropdown ? "true" : "false"}
          >
            Menu
          </button>
        </div>
      </div>
      <div
        className={`flex-grow sm:flex sm:items-center transition-all duration-300 ${
          showDropdown ? "block" : "hidden"
        }`}
      >
        <div className="font-semibold font-seri gap-16 flex justify-center sm:flex-grow px-5 py-2 items-center text-center sm:text-left">
          <h6
            onClick={() => navigate("/showJobs")}
            className="cursor-pointer hover:scale-110 duration-300 hover:bg-gray-200 hover:rounded-md font-sans text-base sm:text-sm hover:px-3 hover:py-2"
          >
            Find Jobs
          </h6>
          <h6
            onClick={() => navigate("/messages")}
            className="cursor-pointer hover:scale-80 duration-300 hover:bg-gray-200 hover:rounded-md font-sans text-base sm:text-sm hover:px-3 hover:py-2"
          >
            Messages
          </h6>
          <div className="relative">
            <h6 onClick={ () => handleMoreDropDown() } className="cursor-pointer hover:scale-110 duration-300 hover:bg-gray-200 hover:rounded-md font-sans text-base sm:text-sm hover:px-3 hover:py-2 more-dropdown">
              More
            </h6>
              <div
                className={`absolute top-10 right-0 bg-white shadow-md rounded-md z-10 ${
                  moreDropDown ? "block" : "hidden"
                }`}
                >
                { moreDropDown && (
                <ul className="py-2">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-center"
                    onClick={() => handleDropdownClick("/profile/my-applications")}
                  >
                    My Applications
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-center"
                    onClick={() => handleDropdownClick("/profile/saved-jobs")}
                  >
                    Saved Jobs
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-center"
                    onClick={() => handleDropdownClick("/profile/my-interviews")}
                  >
                    Interviews
                  </li>
                </ul>
                  )}  
              </div>
          </div>
        </div>
        <div className="flex items-center mt-4 sm:mt-0">
          <h5
            className="px-5 py-3 font-bold text-blue-700 cursor-pointer font-mono text-base sm:text-sm hover:bg-gray-200 hover:scale-90 rounded"
            onClick={handleLogout}
          >
            Logout
          </h5>
          <button
            className="bg-blue-700 text-white py-2 px-5 rounded-md hover:bg-blue-500 font-mono text-base sm:text-sm hover:scale-75 duration-300"
            onClick={() => navigate("/profile/view")}
          >
            Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
