import React from "react";
import { useNavigate } from "react-router-dom";


interface CardsProps {
  text: string;
  icon: React.ComponentType;
  count: number;
  link ?: string 
}


const Cards: React.FC<CardsProps> = ({ text, icon: IconComponent, count  , link}) => {
  const navigate = useNavigate()
  return (
    <div onClick={()=> navigate(`${link}`)} className="max-w-xs border cursor-pointer hover:scale-90 hover:shadow-lg duration-500 rounded overflow-hidden shadow-sm bg-white mx-auto mt-6">
      <div className="px-6 py-4">
        <div className="flex items-center justify-center">
          <div className="bg-gray-800 text-white rounded-full p-3   ">
            <IconComponent  />
          </div>
          <div className="ml-4">
            <div className="font-bold text-md">{text}</div>
          </div>
        </div>
        <div className="text-gray-700 text-base mt-2">
          <p className="text-3xl font-bold text-gray-800">{count}</p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
