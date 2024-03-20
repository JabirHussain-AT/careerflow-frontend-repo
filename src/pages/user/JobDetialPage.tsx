import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IJob } from "../../interface/IJob";
import { fetchJob } from '../../redux/actions/userActions'
import JobDetailPageCom from "../../components/user/FindJob/JobDetailPageCom";

const JobDetailsContainer: React.FC = () => {
  const  { id }  = useParams<{ id: string }>();
  const [job, setJob] = useState<IJob | null>(null);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const jobData = await fetchJob(id);
        setJob(jobData.data);
      } catch (error) {
        console.error("Error fetching job data === :", error);
      }
    };

    fetchJobData();
  }, []);

  return (
    <div>
      { job && <JobDetailPageCom job={ job } />}
    </div>
  );
};

export default JobDetailsContainer;
