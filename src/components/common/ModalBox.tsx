import { ReactNode } from 'react';
import { IoCloseCircleSharp } from "react-icons/io5";

const ModalBox = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode  ;
}) => {
    if (!isOpen) return null

  return (
    <div className="fixed rounded-md inset-0 bg-black bg-opacity-30  backdrop-blur-sm flex justify-center items-center ">
      <div className="w-[600px]  bg-white rounded-md p-2 ">
        <IoCloseCircleSharp
          onClick={() =>{
            console.log('its called onclose ')
             onClose()}}
          className="text-black text-xl hover:cursor-pointer font-bold ms-auto"
        >
          X
        </IoCloseCircleSharp>
        <div className="bg-white p-2 text-black">{children}</div>
      </div>
    </div>
  );
};

export default ModalBox