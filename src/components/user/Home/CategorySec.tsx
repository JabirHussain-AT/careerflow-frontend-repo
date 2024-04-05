import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { ICategory } from "@/interface/ICompanyApprovelModal";
import { fetchCategories } from "@/redux/actions/adminActions";
import designLogo from "../../../assets/design.png";

const CategorySec: React.FC = () => {
  const navigate = useNavigate();
  const [Categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    const fetchCategoriesFun = async () => {
      const result = await fetchCategories();
      setCategories(result?.data);
    };
    fetchCategoriesFun();
  }, []);

  return (
    <>
      <div className="h-auto mb-5 w-full bg-white">
        <div className="flex justify-between py-5 px-4  bg-white">
          <div className="">
            <h3 className="font-bold font-sans text-xl md:text-3xl">
              Explore By <span className="text-blue-500"> Category </span>{" "}
            </h3>
          </div>
          <div>
            <h4 className="text-blue-600 font-medium cursor-pointer" onClick={()=>navigate('/showJobs')}>
              Show all Jobs{" "}
              <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </h4>
          </div>
        </div>
        <div className="flex flex-wrap w-full ">
          {Categories &&
            Categories.map((category) => (
              <div key={category?._id} className="w-auto mt-5 bg-white ">
                <div
                  onClick={() =>
                    navigate(`/showjobs/?category=${category?.category}`)
                  }
                  className="w-40 rounded cursor-pointer h-32 ml-8 border hover:bg-blue-500 group  border-black"
                >
                  <img className="h-12 p-1" src={designLogo} alt="" />
                  <h4 className=" font-bold px-2">{category?.category} </h4>
                  <p className="text-gray-500 font-serif py-3 px-2 text-sm group-hover:text-white">
                    Show Available Jobs{" "}
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="ml-2 text-gray-500 group-hover:text-white"
                    />{" "}
                  </p>
                </div>
              </div>
            ))}
        </div>
        {/*  */}

        {/* to make loop over here */}
      </div>
    </>
  );
};

export default CategorySec;