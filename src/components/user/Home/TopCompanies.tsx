import React from "react";
import GoogleIcon from "../../../assets/googleIcon.png";

const TopCompanies: React.FC = () => {
  return (
    <>
      <div className="h-auto pb-10 w-full bg-white">
        <div className="flex justify-between py-5 px-4  bg-white">
          <div className="">
            <h3 className="font-bold font-sans text-3xl">
              Top <span className="text-blue-500"> Companies </span>{" "}
            </h3>
          </div>
        </div>

        {/*  */}
        <div className=" h-20 w-56 items-start border ml-8">
            <div className="flex justify-start me-2   ">
                <img className="h-8 m-2" src={GoogleIcon} alt="icon" />
                <p className="m-2 text-sm">Google Inc</p>
                <p className="gap-2 text-xs bg-rose-200 text-center mt-2 mb-4 px-1 rounded-md  text-rose-600 font-sans font-semibold"> Featured</p>
            </div>
            <div className="flex justify-center">
                <div className="h-6 bg-blue-300 text-center w-44 rounded">
                    <p className="text-blue-800 font-semibold text-xs font-sans p-1">Open Position (3)</p>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default TopCompanies;
