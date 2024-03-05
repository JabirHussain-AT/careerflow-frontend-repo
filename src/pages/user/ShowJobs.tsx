import React, { useState, useEffect  } from "react";
import   {useNavigate} from 'react-router-dom'
import { IJob } from "../../interface/IJob";
import BannerFindJob from "../../components/user/FindJob/BannerFindJob";
import { BsSave } from "react-icons/bs";
import SearchBar from "@/components/user/FindJob/SearchBar";
import NavBar from "@/components/user/Home/NavBar";
import Footer from "@/components/common/Footer";
import { fetchJobs } from "../../redux/actions/companyActions";

const ShowJobs: React.FC = () => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<IJob[]>([]);
  const navigate = useNavigate()

  useEffect(() => {

    const fetchJobsData = async () => {
      try {
        const jobsData = await fetchJobs();
        setJobs(jobsData.data);
        setFilteredJobs(jobsData.data)
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobsData();

  }, []);

  const handleSearch = (query: string) => {
    // Use filter to find jobs that match the search query
    const filtered : any = jobs.filter((job) =>
      job.jobTitle!.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredJobs(filtered);
  };



  const handleJobDetials = ( jobId : string | undefined ) =>{
    navigate(`/job/${jobId}`)
  }

  return (
    <div>
      <NavBar />
      <div className="w-full bg-green-200 h-auto">
        {/* Search bar */}
        <SearchBar onSearch={handleSearch} />

        {/* Banner */}
        <BannerFindJob />

        {/* Latest Openings */}
        <div className="text-black">
          <div>
            <h2 className="text-3xl font-sans font-bold mx-5 py-5">
              Latest <span className="text-blue-500"> Openings </span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-5 mx-5">
            {filteredJobs.map((job) => (
              <div key={job._id} className="w-full md:w-60 h-auto bg-gradient-to-r  from-yellow-100 rounded-md to-white my-5 p-3" onClick={()=>{handleJobDetials(job._id)}}>
                <div className="text-start font-semibold">
                  <h3 className="font-sans text-lg mb-2">{job.jobTitle}</h3>
                  <div className="flex gap-4">
                    <p className={`border-green-600 border-2 px-1 font-sans text-xs w-20 rounded-md ${job.jobType === 'Part Time' || job.jobType === 'Full time' ? 'bg-green-300 font-semibold text-green-800' : 'bg-red-300 font-semibold text-red-800'}`}>
                      {job.jobType}
                    </p>
                    <p className="text-gray-400 text-xs font-sans">
                      {" "}
                      Salary: {job.fromSalary} - {job.toSalary}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <img className="w-8 p-1 h-auto" src={job?.companyId?.logo} alt="" />
                    <p>{job?.companyId?.userName}</p>
                    <BsSave />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShowJobs;
