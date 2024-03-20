import React, { useState, useEffect } from "react";
import { IoIosAdd } from "react-icons/io";
import { getUnreadMessageCount } from "@/redux/actions/chatActions";
import { useSocket } from "@/contexts/socketContext";
import { useDispatch } from "react-redux";
import { updateUnreadMessageCount} from '@/redux/actions/chatActions'
import { AppDispatch } from "@/redux/store";

interface Applicant {
  _id: string;
  applicantId: string;
  avatar: string;
  name: string;
  role: string;
  unreadMessages: number;
  messages: number;
}

interface MessagesSideBarProps {
  applicants: any[];
  onSelect: (applicantId: string) => void;
  selectedApplicant: any;
  onLoadMore: () => void; // Add onLoadMore function prop
}

const MessagesSideBarUser: React.FC<MessagesSideBarProps> = ({
  applicants,
  onSelect,
  selectedApplicant,
  onLoadMore,
}) => {

  const { messages } = useSocket();
  const dispatch = useDispatch<AppDispatch>()
  const [applicantsWithUnreadMessages, setApplicantsWithUnreadMessages] =
    useState<Applicant[]>([]);

  useEffect(() => {
    // Fetch unread messages count for each applicant
    const fetchUnreadMessagesCount = async () => {
      try {
        const applicantIds = applicants.map((applicant) => applicant._id);
        const response = await getUnreadMessageCount(applicantIds);
        console.log("Response from getUnreadMessageCount:", response); // Check response

        // Update applicants with unread message counts
        const updatedApplicants = applicants.map((applicant) => {
          return {
            ...applicant,

            unreadMessages: response?.data?.[applicant._id] || 0,
          };
        });

        setApplicantsWithUnreadMessages(updatedApplicants);
        applicants = updatedApplicants;
        console.log(
          "🚀 ~ file: MessagesSideBar.tsx:49 ~ fetchUnreadMessagesCount ~ applicants:",
          applicants
        );
      } catch (error) {
        console.error("Error fetching unread messages counts:", error);
      }
    };

    fetchUnreadMessagesCount();
  }, [applicants , dispatch ]);



  const markMessagesAsRead = async (applicantId : any ) => {
    try {
      await dispatch(updateUnreadMessageCount(applicantId));
      setApplicantsWithUnreadMessages(prevApplicants => {
        return prevApplicants.map(applicant => {
          if (applicant._id === applicantId) {
            return {
              ...applicant,
              unreadMessages: 0 // Assuming setting unreadMessages to 0 marks messages as read
            };
          }
          return applicant;
        });
      });
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };
  
  


  return (
    <>
      <div className="w-4/12 h-screen flex justify-center">
        {/* side bar showing recent messages */}
        <div className="bg-white h-auto overflow border-2 w-4/5 rounded-xl">
          {/* head section */}
          <div className="flex items-center justify-between px-3 border-b border-black shadow-md">
            <div className="flex items-center justify-center gap-2">
              <h1 className="font-bold text-lg font-serif text-center ps-4 py-3 ">
                {" "}
                Messages{" "}
              </h1>
              <span className="bg-gray-200 h-4 flex justify-center items-center w-6 text-sm rounded-full text-center font-semibold text-red-600">
                {" "}
                {applicants.length}
              </span>
            </div>
            <div className="bg-blue-500 text-white text-xl rounded-full hover:bg-blue-700 hover:scale-125 cursor-pointer">
              <IoIosAdd />
            </div>
          </div>
          {/* search option */}
          <div className="flex justify-center items-center">
            <div className="mt-3 w-full flex justify-center">
              <input
                type="text"
                placeholder="Search people"
                className="text-sm text-mono w-11/12 py-2 text-center bg-gray-200 px-1 rounded-lg focus:outline-dashed"
              />
            </div>
          </div>
          {/* messages section */}
          <div className="">
            {applicants.length > 0 ? (
              <div className="">
                {applicants.map((applicant: any) => (
                  <div
                    key={applicant?._id}
                    className={`flex gap-3 hover:bg-blue-100 m-2 rounded-md border ${
                      selectedApplicant?._id! === applicant?._id
                        ? "bg-blue-100"
                        : ""
                    }`}
                    onClick={() => {
                      onSelect(applicant);
                      markMessagesAsRead(applicant._id); // Call the function to mark messages as read
                    }}
                  >
                    <div className="m-2 rounded-xl flex items-center justify-center bg-white ">
                      <img
                        className="w-9  rounded-xl border m-1"
                        src={applicant.profilePic}
                        alt="hey"
                      />
                    </div>
                    <div className="w-auto flex flex-col justify-center items-center">
                      <h1 className="text-xs font-semibold font-sans">
                        {applicant?.userName}
                      </h1>
                      <p className="text-xs font-extralight ">
                        {applicant?.position}
                      </p>
                      <div className="w-auto mt-3 justify-center items-start">
                        {applicantsWithUnreadMessages &&
                          applicantsWithUnreadMessages.find(
                            (item) => item._id === applicant._id
                          )?.unreadMessages! > 0 && (
                            <p className="text-xs font-bold font-">
                              <span className="text-red-500">
                                {
                                  applicantsWithUnreadMessages.find(
                                    (item) => item._id === applicant._id
                                  )?.unreadMessages
                                }
                              </span>{" "}
                              unread Messages
                            </p>
                          )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>No applicants available</div>
            )}
          </div>
          {/* Load More Button */}
          {applicants.length > 15 && (
            <div className="flex justify-center mt-2">
              <button
                onClick={onLoadMore}
                className="bg-blue-500 text-white px-3 py-1 rounded-md"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MessagesSideBarUser;
