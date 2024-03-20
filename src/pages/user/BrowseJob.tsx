import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchJobsMain } from "@/redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { IUserSelector } from "@/interface/IUserSlice";
import NavBar from "@/components/user/Home/NavBar";
import SearchBar from "@/components/user/FindJob/SearchBar";
import AllJobs from "@/components/user/FindJob/AllJobs";
import BannerFindJob from "@/components/user/FindJob/BannerFindJob";
import FilterSidebar from "@/components/user/FindJob/FilterSideBar";
import Footer from "@/components/common/Footer";
import Pagination from "@/components/common/Pagination";

const BrowseJob: React.FC = () => {

  const { user } = useSelector((state: IUserSelector) => state.user);
  const [filteredData, setFilteredData] = useState([]);
  const [employmentTypes, setEmploymentTypes] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState("");
  const [page, setPage] = useState(1);
  const [sectionVisibility, setSectionVisibility] = useState({
    employmentTypes: true,
    categories: true,
    salaryRange: true,
  });
  const [totalJobs , setTotalJobs ] = useState<number>(0)
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(
          fetchJobsMain({
            categories: categories,
            jobType: employmentTypes,
            salary: salaryRange,
            search: searchQuery,
            page: page,
          })
        );
        // console.log(result);
        if (result && result.payload?.data) {
          setFilteredData(result.payload?.data[0]);
          setTotalJobs(result?.payload.data[1])
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [categories, employmentTypes, salaryRange, searchQuery , page ]);


  useEffect(() => {
    const typeOfEmploymentParam = searchParams.get("typeOfEmployment");
    const categoriesParam = searchParams.get("category");
    const salaryRangeParam = searchParams.get("salaryRange");
    const searchParam = searchParams.get("search");
    searchParams.get("page");

    if (typeOfEmploymentParam) {
      setEmploymentTypes(typeOfEmploymentParam.split(","));
    }

    if (categoriesParam) {
      setCategories(categoriesParam.split(","));
    }

    if (salaryRangeParam) {
      setSalaryRange(salaryRangeParam);
    }


    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  //for clearing filters

  const clearFilters = () => {
    const params = new URLSearchParams();

    params.delete("typeOfEmployment");
    params.delete("category");
    params.delete("salaryRange");
    params.delete("search");
    params.delete("page")

    setSearchParams(params);

    setEmploymentTypes([]);
    setCategories([]);
    setSalaryRange("");
    setSearchQuery("");
    setPage(1)
  };

  const handleSearch = (query: string) => {

    setSearchQuery(query);
    updateURLParams({ search: query });

  };

  const toggleSectionVisibility = (section: string) => {

    setSectionVisibility((prevVisibility: any) => ({
      ...prevVisibility,
      [section]: !prevVisibility[section],
    }));

  };

  const handleEmploymentTypeChange = (type: string) => {

    setEmploymentTypes((prevTypes) => {
      const updatedTypes = prevTypes.includes(type)
        ? prevTypes.filter((t) => t !== type)
        : [...prevTypes, type];

      updateURLParams({ typeOfEmployment: updatedTypes.join(",") });

      return updatedTypes;
    });

  };

  const handleCategoryChange = (category: string) => {

    setCategories((prevCategories) => {
      const updatedCategories = prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category];

      updateURLParams({ category: updatedCategories.join(",") });

      return updatedCategories;
    });

  };


  const handleSalaryRangeChange = (range: string) => {

    setSalaryRange(range);
    updateURLParams({ salaryRange: range });

  };

  const updateURLParams = (params: Record<string, string>) => {

    const newSearchParams = new URLSearchParams(window.location.search);
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key);
      }
    });

    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${newSearchParams}`
    );

  };

  const handlePageChange = (newPage: number) => {

    setPage(newPage);
    updateURLParams({ page: newPage.toString() });

  };

  const getRangeValue = (salaryRangeLabel: string) => {

    switch (salaryRangeLabel) {
      // Adjust the value based on the range distribution
      case "Below 3 LPA":
        return 0;
      case "3-10 LPA":
        return 8; 
      case "More than 10 LPA":
        return 15;
      default:
        return 0;
    }

  };

  const getSalaryRangeLabel = (value: number) => {

    if (value < 4) {
      return "Below 3 LPA";
    } else if (value < 12) {
      return "3-10 LPA";
    } else {
      return "More than 10 LPA";
    }

  };

  return (
    <div className="h-full flex justify-center bg-green-200 flex-col">
      <NavBar />
      <SearchBar onSearch={handleSearch} />
      <BannerFindJob />
      <div className="w-11/12  ml-8"></div>
      <div className="flex-1 m-3 bg-white shadow-lg mx-20 rounded bg-white-700 flex justify-center">
        {/* Use the FilterSidebar component here */}
        <FilterSidebar
          employmentTypes={employmentTypes}
          categories={categories}
          page={page}
          salaryRange={salaryRange}
          sectionVisibility={sectionVisibility}
          handleEmploymentTypeChange={handleEmploymentTypeChange}
          handleCategoryChange={handleCategoryChange}
          handleSalaryRangeChange={handleSalaryRangeChange}
          toggleSectionVisibility={toggleSectionVisibility}
          getRangeValue={getRangeValue}
          getSalaryRangeLabel={getSalaryRangeLabel}
          clearFilters={clearFilters}
        />
        <div className="w-3/5">
          {/* Content of the main section */}
          <AllJobs filteredData={filteredData} userId={user?._id} />
        </div>
      </div>
      {/* pagination */}
    { ( totalJobs > 10 ) &&
        <Pagination currentPage={page} onPageChange={handlePageChange} totalPages={Math.ceil(totalJobs / 10)} />
    }
      {/* footer */}
      <Footer />  
    </div>
  );
};

export default BrowseJob;
