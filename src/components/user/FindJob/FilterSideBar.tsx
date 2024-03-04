// FilterSidebar.tsx
import React from "react";
import { BiArrowToBottom } from "react-icons/bi";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { Range } from "react-range";

interface FilterSidebarProps {
  employmentTypes: string[];
  categories: string[];
  salaryRange: string;
  page : number ;
  sectionVisibility: any;
  handleEmploymentTypeChange: (type: string) => void;
  handleCategoryChange: (category: string) => void;
  handleSalaryRangeChange: (range: string) => void;
  toggleSectionVisibility: (section: string) => void;
  getRangeValue: (salaryRangeLabel: string) => number;
  getSalaryRangeLabel: (value: number) => string;
  clearFilters: () => void;
}

const FilterSideBar: React.FC<FilterSidebarProps> = ({
  employmentTypes,
  categories,
  salaryRange,
  sectionVisibility,
  page ,
  handleEmploymentTypeChange,
  handleCategoryChange,
  handleSalaryRangeChange,
  toggleSectionVisibility,
  getRangeValue,
  getSalaryRangeLabel,
  clearFilters,
}) => {
  return (
    <div className="w-1/3 bg-white m border-e-4 rounded-sm p-5 flex flex-col">
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-3">
          <h1
            className="font-bold "
            onClick={() => toggleSectionVisibility("employmentTypes")}
          >
            Types of Employment
          </h1>
          <BiArrowToBottom
            onClick={() => toggleSectionVisibility("employmentTypes")}
            className={`transform ${
              sectionVisibility.employmentTypes ? "rotate-180" : ""
            } duration-300`}
          />
        </div>
        {sectionVisibility.employmentTypes && (
          <div className="ml-2">
            {["Full time", "Part Time", "Remote"].map((type) => (
              <label key={type} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  value={type}
                  checked={employmentTypes.includes(type)}
                  onChange={() => handleEmploymentTypeChange(type)}
                  className="mr-2"
                />
                {type}
              </label>
            ))}
          </div>
        )}
      </div>
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-3">
          <h1
            className="font-bold"
            onClick={() => toggleSectionVisibility("categories")}
          >
            Categories
          </h1>
          <BiArrowToBottom
            onClick={() => toggleSectionVisibility("categories")}
            className={`transform ${
              sectionVisibility.categories ? "rotate-180" : ""
            } duration-300`}
          />
        </div>
        {sectionVisibility.categories && (
          <>
            {["Design", "Sales", "Engineering"].map((category) => (
              <label key={category} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  value={category}
                  checked={categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="mr-2"
                />
                {category}
              </label>
            ))}
          </>
        )}
      </div>
      <div>
        <div className="flex items-center gap-3 mb-3">
          <h1
            className="font-bold text-lg hover:text-blue-500 cursor-pointer"
            onClick={() => toggleSectionVisibility("salaryRange")}
          >
            Salary Range
          </h1>
          <BiArrowToBottom
            onClick={() => toggleSectionVisibility("salaryRange")}
            className={`transform ${
              sectionVisibility.salaryRange ? "rotate-180" : ""
            } duration-300`}
          />
        </div>
        {sectionVisibility.salaryRange && (
          <div className="ml-2">
            <Range
              step={1}
              min={0}
              max={15}
              values={[getRangeValue(salaryRange)]}
              onChange={(values) =>
                handleSalaryRangeChange(getSalaryRangeLabel(values[0]))
              }
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "6px",
                    width: "100%",
                    borderRadius: "5px",
                    background: "linear-gradient(to right, #007BFF, #00C2FF)",
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props, isDragged }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "20px",
                    width: "20px",
                    backgroundColor: isDragged ? "#007BFF" : "#fff",
                    borderRadius: "50%",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    border: "2px solid #007BFF",
                    cursor: "grab",
                  }}
                />
              )}
            />
            <div className="flex justify-between mt-2">
              <span className="text-gray-600 text-[8px] hover:text-blue-500 cursor-pointer">
                Below 3 LPA
              </span>
              <span className="text-gray-600 text-[8px] hover:text-blue-500 cursor-pointer">
                3-10 LPA
              </span>
              <span className="text-gray-600 text-[8px] hover:text-blue-500 cursor-pointer">
                More than 10 LPA
              </span>
            </div>
            <div className="mt-2">
              <span className="text-sm font-semibold text-gray-700">
                Selected Range:
              </span>
              <span className="ml-2 text-blue-500 text-sm font-mono">
                {salaryRange}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="flex w-full duration-300 justify-center">
        {(employmentTypes?.length > 0 ||
          categories?.length > 0 ||
          salaryRange?.length > 0 || page > 1)  && (
          <div
            onClick={clearFilters}
            className="flex duration-300 bg-blue-200 my-2 px-4 rounded py-1 hover:bg-blue-700 hover:text-white font-serif"
          >
            <button className="">Clear Filter </button>
            <span>
              <MdOutlineDeleteSweep className="text-2xl" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSideBar;
