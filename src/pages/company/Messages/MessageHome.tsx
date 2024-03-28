// MessageHome.tsx

import React, { useState, useEffect } from "react";
import { chatUsersDetials } from "@/redux/actions/userActions";
import { fetchChatUsers } from "@/redux/actions/chatActions";
import MessagesSideBar from "@/components/company/Messages/MessagesSideBar";
import MessageChatSection from "@/components/company/Messages/MessageChatSection";
import { useDispatch, useSelector } from "react-redux";
import { IUserSelector } from "@/interface/IUserSlice";
import { AppDispatch } from "@/redux/store";

const MessageHome: React.FC = () => {
  const [applicants, setApplicants] = useState([]);
  const { user } = useSelector((state: IUserSelector) => state.user);
  const [limit, setLimit] = useState(15);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedApplicant, setSelectedApplicant] = useState<any | null>(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await dispatch(
          fetchChatUsers({ companyId: user?._id, limit: limit })
        );
        if (response?.payload?.data && response?.payload?.data?.length > 0) {
          let data = [response?.payload?.data, "company"];
          const userDetials = await dispatch(chatUsersDetials(data));
          setApplicants(userDetials.payload.data);
        }
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };

    fetchApplicants();
  }, [dispatch, user, limit]);

  const handleApplicantSelect = (applicantId: any) => {
    setSelectedApplicant(applicantId);
  };

  const handleLoadMore = () => {
    // Increase the limit by 15 when "Load More" is clicked
    setLimit((prevLimit) => prevLimit + 15);
  };

  return (
    <div className="bg-white w-full overflow-hidden min-h-screen mb-5">
      <div className="w-full flex flex-wrap rounded-lg border">
        <MessagesSideBar
          applicants={applicants}
          onSelect={handleApplicantSelect}
          selectedApplicant={selectedApplicant}
          onLoadMore={handleLoadMore}
        />
        {selectedApplicant && (
          <MessageChatSection applicant={selectedApplicant} />
        )}
        {!selectedApplicant && (
          <div className="flex items-center bg-green-50 justify-center min-h-screen">
            <div className="w-7/12 bg-green-100 p-8 rounded-lg shadow-lg text-center">
              <h2 className="text-3xl font-bold mb-4">Welcome to the Chat</h2>
              <p className="text-lg text-gray-700 mb-6">
                Select an applicant from the list on the left to start chatting.
              </p>
              <img
                src="https://th.bing.com/th?id=OIP.7CsPF5A-mdlp57l5Vr4nmQHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
                alt="Chat Icon"
                className="h-32 mx-auto mb-6"
              />
              <p className="text-sm text-gray-500">
                Explore and connect with your in real-time.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageHome;
