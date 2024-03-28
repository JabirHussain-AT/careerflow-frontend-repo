import React, { useState, useEffect, useRef } from "react";
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import {  format } from "date-fns";
import "react-toastify/dist/ReactToastify.css";
import { useSocket } from "@/contexts/socketContext";
import {
  fetchChatUserChat,
  saveChatMessages,
} from "@/redux/actions/chatActions";
import { AppDispatch } from "@/redux/store";

interface MessageChatSectionProps {
  applicant: {
    _id: string;
    profilePic: string;
    userName: string;
  };
}

const MessageChatSection: React.FC<MessageChatSectionProps> = ({
  applicant,
}) => {
  const { socket } = useSocket();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: any) => state.user);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [recieverStatus, setRecieverStatus] = useState<boolean>(false);

  useEffect(() => {
    // Clear messages when the applicantId changes
    setMessages([]);
  }, [applicant]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      autoScroll();
    }
  }, [messages, applicant]);

  useEffect(() => {
    const fetchData = async () => {
      if (applicant) {
        try {
          const responseData = await dispatch(
            fetchChatUserChat({
              senderId: user?._id,
              recieverId: applicant?._id,
            })
          );
          setMessages(responseData?.payload?.data);
        } catch (error) {
          console.error("Error fetching chat:", error);
        }
      }
    };

    fetchData(); // Call the async function immediately
  }, [applicant, user, dispatch]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      socket &&
        socket.emit("status-check", {
          receiverId: applicant?._id,
          senderId: user?._id,
        });
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [socket, applicant?._id, user?._id]);

  useEffect(() => {
    const fetchDataAndUpdateMessages = async () => {
      try {
        const updatedChatData = await dispatch(
          fetchChatUserChat({
            senderId: user?._id,
            recieverId: applicant?._id,
          })
        );
  
        setMessages(updatedChatData?.payload?.data);
      } catch (error) {
        console.error("Error fetching chat:", error);
      }
    };
  
    if (socket) {
      socket.off("new-message").on("new-message", (message: any) => {
        console.log(message)
        fetchDataAndUpdateMessages();
      });
  
      socket.off("statusCheck-result").on("statusCheck-result", (status: any) => {
        setRecieverStatus(status);
      });
    }
    socket.emit("check",'check-success')
  }, [socket, applicant, user, dispatch]);
  

  const autoScroll = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  const sendMessage = async () => {
    if (inputMessage.trim() === "") return;
  
    const sentMessage = {
      content: inputMessage,
      senderId: user?._id,
      sentByUser: true,
    };
    console.log(sentMessage)
  
    let temp = {
      content: inputMessage,
      senderId: user?._id,
      recieverId: applicant?._id,
      latestMessage: inputMessage,
    };
  
     await dispatch(saveChatMessages(temp));
  
    // Fetch updated chat data after sending the message
    const updatedChatData = await dispatch(
      fetchChatUserChat({
        senderId: user?._id,
        recieverId: applicant?._id,
      })
    );

    setMessages(updatedChatData?.payload?.data);
  
    const toSendId = applicant._id;
    socket.emit("send-message", {
      content: inputMessage,
      receiverId: toSendId,
      senderId: user?._id,
    });

    setInputMessage("");
  };
  
  


  return (
    <div className="relative max-h-screen bg-green-100 w-7/12 rounded-lg overflow-hidden border shadow-lg">
  {applicant && applicant._id ? (
    <>
      <div className="w-full h-12 flex bg-red-50">
        <img
          className="h-10 rounded-full p-1 mt-2 "
          src={`${applicant.profilePic}`}
          alt=""
        />
        <div className="flex flex-col items-center gap-1">
          <p className="text-serif font-semibold text-sm">
            {applicant.userName}
          </p>
          <p
            className={`text-mono font-semibold text-xs text-gray-500 ${
              recieverStatus
                ? "bg-green-200 px-2 rounded-sm text-xs text-green-700"
                : "text-gray-400"
            }`}
          >
            {recieverStatus ? "online" : "offline"}
          </p>
        </div>
      </div>
      <div
        ref={messagesContainerRef}
        className="w-full overflow-y-auto h-5/6 flex flex-col p-4"
      >
        {messages &&
          messages.map((message, index) => (
            <div key={index} className={`flex flex-col mb-2`}>
              {message.createdAt && (
                <>
                  {(index === 0 ||
                    (messages[index - 1] &&
                      new Date(messages[index - 1]?.createdAt).getDate() !==
                        new Date(message.createdAt).getDate())) && (
                    <div className="text-center text-gray-500 text-xs mb-2">
                      {format(new Date(message?.createdAt), "EEEE, MMMM d, yyyy")}
                    </div>
                  )}
                  <div
                    className={`flex items-${
                      message.senderId === user?._id ? "end" : "start"
                    }`}
                  >
                    <div
                      className={`w-${
                        message.senderId === user?._id ? "11/12 text-right" : "1/12"
                      }`}
                    >
                      <div
                        className={`bg-${
                          message.senderId === user?._id
                            ? "blue-500 text-white"
                            : "gray-300"
                        } p-2 w-50 rounded-lg inline-block`}
                      >
                        {message.content ?? message?.message}
                        <span className="text-sm text-gray-800 ml-2">
                          {message.createdAt &&
                            format(new Date(message.createdAt), "h:mm aa")}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`w-${
                        message.senderId === user?._id ? "5/12" : "11/12"
                      }`}
                    >
                      {message.senderId === user?._id ? (
                        <img
                          className="w-10 h-10 rounded-full"
                          src="https://www.kasandbox.org/programming-images/avatars/old-spice-man-blue.png"
                          alt="dp"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
      </div>
    </>
  ) : (
    <div className="w-full h-12 flex bg-red-50 items-center justify-center">
      No applicant selected
    </div>
  )}

  <div className="absolute bottom-0 left-0 right-0 mb-2 mx-4">
    <div className="w-full flex justify-center">
      <div className="flex items-center w-10/12 ">
        <input
          type="text"
          placeholder="Type a message"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="px-3 py-2 w-full border rounded-lg bg-gray-200 focus:outline-dotted"
        />
        <button
          onClick={sendMessage}
          className="w-1/12 bg-blue-500 text-white flex justify-center px-2 py-2 rounded-lg ml-2"
        >
          <IoIosSend />
        </button>
      </div>
    </div>
  </div>
  <ToastContainer />
</div>

  );
};

export default MessageChatSection;
