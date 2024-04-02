import React, { useState, useEffect } from "react";
import { chatCompanyDetials } from "@/redux/actions/companyActions";
import { fetchChatUsers } from "@/redux/actions/chatActions";
import MessagesSideBarUsers from "@/components/company/Messages/MessageSideBarUsers";
import MessageChatSectionUser from "@/components/company/Messages/MessageChatSectionUser";
import { useDispatch, useSelector } from "react-redux";
import { IUserSelector } from "@/interface/IUserSlice";
import { AppDispatch } from "@/redux/store";
import NavBar from "@/components/user/Home/NavBar";

const MessageHome: React.FC = () => {
  const [applicants, setApplicants] = useState([]);
  const { user } = useSelector((state: IUserSelector) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedApplicant, setSelectedApplicant] = useState();
  const [limit, setLimit] = useState(15);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await dispatch(
          fetchChatUsers({ companyId: user?._id, limit: limit })
        );
        if (response?.payload?.data && response?.payload?.data?.length > 0) {
          let data = [response?.payload?.data, "user"];

          const companyDetials = await dispatch(chatCompanyDetials(data));
          setApplicants(companyDetials.payload.data);
        }
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };

    fetchApplicants();
  }, [dispatch, user]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Change the breakpoint as needed
    };

    handleResize(); // Call initially to set the correct initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleApplicantSelect = (applicant: any) => {
    setSelectedApplicant(applicant);
  };

  const handleBackButtonClick = () => {
    setSelectedApplicant(null);
  };

  const chatSection = selectedApplicant && (
    <MessageChatSectionUser applicant={selectedApplicant} />
  );

  return (
    <div className="bg-green-200 w-full overflow-hidden min-h-screen mb-5">
      <NavBar />
      <div className="w-full flex flex-wrap rounded-lg border">
        <MessagesSideBarUsers
          applicants={applicants}
          onSelect={handleApplicantSelect}
          selectedApplicant={selectedApplicant}
          onLoadMore={handleLoadMore}
        />
        {!isMobile && chatSection}
        {!selectedApplicant && (
          <div className="flex items-center bg-green-50 justify-center min-h-screen">
            <div className="w-7/12 bg-green-100 p-8 rounded-lg shadow-lg text-center">
              <h2 className="text-3xl font-bold mb-4">Welcome to the Chat</h2>
              <p className="text-lg text-gray-700 mb-6">
                Select an company from the list on the left to start chatting.
              </p>
              <img
                src="https://th.bing.com/th?id=OIP.7CsPF5A-mdlp57l5Vr4nmQHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
                alt="Chat Icon"
                className="h-32 mx-auto mb-6"
              />
              <p className="text-sm text-gray-500">
                Explore and connect with your Companies in real-time.
              </p>
            </div>
          </div>
        )}
        {isMobile && selectedApplicant && (
          <div className="w-full">
            {chatSection}
            <button
              onClick={handleBackButtonClick}
              className="bg-green-500 text-white font-semibold px-4 py-2 mt-4 ml-4 rounded-lg"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageHome;
