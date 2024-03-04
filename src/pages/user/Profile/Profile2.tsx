import NavBar from "@/components/user/Home/NavBar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {IUserDoc} from '../../../interface/IUserDoc'
import Footer from "@/components/common/Footer";


const Profile2: React.FC = () => {
  const [userData, setUserData] = useState<any | null>(null);

  useEffect(() => {
    // Fetch user data from your backend or database
    const fetchUserData = async () => {
      try {
        // Sample data for testing
        const sampleData = {
          userName: "John Doe",
          email: "john.doe@example.com",
          profilePic:
            "https://www.kasandbox.org/programming-images/avatars/spunky-sam-green.png",
          socialLinks: [
            { link: "http://linkedin.com/johndoe", socialMedia: "LinkedIn" },
            { link: "http://github.com/johndoe", socialMedia: "GitHub" },
          ],
          status: "Active",
          jobStatus: "Employed",
          about: "Passionate developer",
          skills: ["Node.js", "MongoDB", "JavaScript", "React"],
          languages: ["English", "Spanish", "Urdu"],
          education: [
            {
              degree: "Bachelor's in Computer Science",
              institute: "University XYZ",
              from: "Sep-2019",
              to: "May-2023",
            },
            {
              degree: "Master's in Software Engineering",
              institute: "Tech Institute",
              from: "Sep-2023",
              to: "May-2025",
            },
          ],
          experience: [
            {
              position: "Software Developer",
              company: "TCS",
              from: "Mar-2023",
              to: "Sep-2024",
            },
            {
              position: "Tech Lead",
              company: "Qburst",
              from: "Sep-2024",
              to: "Present",
            },
          ],
          address: {
            street: "123 Main St",
            city: "Cityville",
            state: "State",
            zipCode: "12345",
          },
        };

        // Set sample data for testing
        setUserData(sampleData);

        // Uncomment the following line to fetch actual data from your API
        // const response = await axios.get("/api/user");
        // setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <NavBar />
      <div className="flex justify-around items-baseline w-full bg-green-200 h-auto">
        <div className="w-7/12 rounded-md mt-10 mb-5 bg-white shadow-lg p-6">
          <div className="flex justify-between mb-4">
            <div className="flex items-center">
              {userData && (
                <img
                  className="w-12 h-auto rounded-full mr-4"
                  src={userData.profilePic || "default-avatar.png"}
                  alt="Profile Pic"
                />
              )}
              <div>
                {userData && (
                  <>
                    <h1 className="font-bold text-lg">{userData.userName}</h1>
                    <h2 className="text-sm text-gray-500">{userData.email}</h2>
                  </>
                )}
              </div>
            </div>
            <div>
              {userData && (
                <>
                  <a
                    href={userData.socialLinks && userData.socialLinks[0].link}
                    className="text-blue-600 underline text-sm"
                  >
                    {userData.socialLinks &&
                      userData.socialLinks[0].socialMedia}
                  </a>
                  <br />
                  <a
                    href={userData.socialLinks && userData.socialLinks[1].link}
                    className="text-blue-600 underline text-sm"
                  >
                    {userData.socialLinks &&
                      userData.socialLinks[1].socialMedia}
                  </a>
                </>
              )}
            </div>
          </div>
          <hr className="border-t border-gray-500 mb-4" />
          <div className="mb-4 flex items-center">
            <h1 className="text-md font-bold font-mono mb-2">
              Date Of Birth :
            </h1>
            <span className="text-sm m-3 mb-5 font-normal ">
              {userData?.dob || "N/A"}
            </span>
          </div>
          <div className="mb-4 flex items-center">
            <h1 className="text-md font-bold font-mono mb-2">Address:</h1>
            {userData?.address ? (
              <div className="ml-3">
                <p className="text-sm">
                  {userData.address.street}, {userData.address.city}
                </p>
                <p className="text-sm">
                  {userData.address.state}, {userData.address.zipCode}
                </p>
              </div>
            ) : (
              <p className="text-sm mb-2">N/A</p>
            )}
          </div>
          <div className="mb-4 flex items-center">
            <h2 className="font-mono font-bold"> Skills : </h2>
            <div className="flex justify-between">
              {userData?.skills &&
                userData.skills.map((skill : any, index : any)  => (
                  <span
                    key={index}
                    className="text-sm px-3 m-2 py-1 rounded-md border border-black"
                  >
                    {skill}
                  </span>
                ))}
            </div>
          </div>
          <div className="mb-4 flex items-center">
            <h1 className="text-md font-bold font-mono mb-2">Job Status:</h1>
            <span className="text-sm m-3 font-normal ">
              {userData?.jobStatus || "N/A"}
            </span>
          </div>
          <div className="mb-4 flex items-center ">
            <h1 className="text-md font-bold font-mono mb-2">About:</h1>
            <p className="text-sm mb-2 font-normal">
              {userData?.about || "N/A"}
            </p>
          </div>
          <div className="mb-4 flex items-center">
            <h1 className="text-md font-bold font-mono mb-2">Skills:</h1>
            <p className="text-sm mb-2">
              {userData?.skills ? userData.skills.join(", ") : "N/A"}
            </p>
          </div>
          <div className="mb-4 flex items-center">
            <p className="text-md font-bold font-mono mb-2">Languages:</p>
            <p className="text-sm mb-2">
              {userData?.languages ? userData.languages.join(", ") : "N/A"}
            </p>
          </div>
          <div className="mb-4">
            <h1 className="text-md font-bold font-mono mb-2">Education:</h1>
            {userData?.education ? (
              userData.education
                .slice()
                .reverse()
                .map((edu: any, index: any) => (
                  <div key={index} className="mb-2 ml-10">
                    <p className="text-sm font-bold">
                      {edu.degree} at {edu.institute}
                    </p>
                    <p className="text-sm">
                      {edu.from} to {edu.to}
                    </p>
                  </div>
                ))
            ) : (
              <p className="text-sm mb-2">N/A</p>
            )}
          </div>
          <div className="mb-4">
            <h1 className="text-md font-bold font-mono mb-2">Experience:</h1>
            {userData?.experience ? (
              userData.experience
                .slice()
                .reverse()
                .map((exp: any, index: any) => (
                  <div key={index} className="mb-2 ml-10">
                    <p className="text-sm font-bold">
                      {exp.position} at {exp.company}
                    </p>
                    <p className="text-sm">
                      {exp.from} to {exp.to}
                    </p>
                  </div>
                ))
            ) : (
              <p className="text-sm">N/A</p>
            )}
          </div>
        </div>
        <div className="w-full md:w-4/12 h-auto md:h-[auto] rounded-md  bg-white shadow-lg   ">
          <div className="w-full m-5">
            <a href="/edit-profile">
              <button className="btn  bg-blue-300 mb-3 w-f rounded-md  text-sm text-center px-5 py-2 w-11/12 hover:bg-blue-500 md:mb-2">
                Edit Profile
              </button>
            </a>
            <a href="/saved-jobs">
              <button className="btn mb-3  rounded-md  text-sm text-center px-5 py-2 w-11/12 bg-blue-300 hover:bg-blue-500 md:mb-2">
                Saved Jobs
              </button>
            </a>
            <a href="/applied-jobs">
              <button className="btn mb-3 rounded-md  text-sm text-center px-5 py-2 w-11/12 bg-blue-300  hover:bg-blue-500 md:mb-2">
                Applied Jobs
              </button>
            </a>
            <a href="/meetings-scheduled">
              <button className="btn mb-3 rounded-md  text-sm text-center px-5 py-2 w-11/12 bg-blue-300 hover:bg-blue-500  md:mb-2">
                Meetings Scheduled
              </button>
            </a>
          </div>

          {/* Add more buttons as needed */}
        </div>
      </div>
        < Footer />
    </>
  );
};

export default Profile2;
