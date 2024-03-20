import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify"; // Import toast here
import io from "socket.io-client";

interface SocketContextProps {
  children: ReactNode;
}

interface SocketContextType {
  socket: any | null;
  messages: any[]; // Array to store messages
  addMessage: (message: any) => void; // Function to add a new message
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<SocketContextProps> = ({ children }) => {
  const [socket, setSocket] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]); // State to store messages

  useEffect(() => {
    const newSocket = io("http://localhost:3005");
    setSocket(newSocket);

    newSocket.on("new-message", (message: any) => {
      toast.info("New Message Received", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      // Handle the new message event globally
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  // Function to add a new message
  const addMessage = (message: any) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const contextValue: SocketContextType = { socket, messages, addMessage };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
