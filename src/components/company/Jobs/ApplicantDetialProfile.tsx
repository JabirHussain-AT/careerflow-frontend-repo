import { format } from "date-fns";
import { getUser } from "@/redux/actions/userActions";
import { fetchComJobs } from "@/redux/actions/companyActions";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IUserSelector } from "@/interface/IUserSlice";

const ApplicantDetialProfile = () => {
  const { jobId, applicantId } = useParams();
  const { Job } = useSelector((state: any) => state.Job);
  const { user } = useSelector((state: IUserSelector) => state.user);
  const [job, setJob] = useState<any | null>(null);
  const [applicantData, setApplicantData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchComJobs(user._id);
        const foundJob = res.data.find((job: any) => jobId === job._id) || null;
        setJob(foundJob);

        if (foundJob) {
          const applicantDataFetch = await getUser(applicantId);
          setApplicantData(applicantDataFetch.data);
        }
      } catch (error) {
        console.error("Error fetching company jobs:", error);
      }
    };

    fetchData();
  }, [jobId, user._id,Job]);

  return (
    <div className="mt-4">
      <h1 className="font-semibold text-blue-gray-800 ms-3">Personal Info</h1>
      <div className="ms-3 grid grid-cols-2 border-b-2">
        <div>
          <h1 className="text-sm text-gray-600 mt-4 poppins">Full Name</h1>
          <h1 className="text-sm text-gray-900 ">
            {applicantData?.userName || "Not Provided"}
          </h1>
        </div>
        <div>
          <h1 className="text-sm text-gray-600 mt-4 poppins">Date of birth</h1>
          <h1 className="text-sm text-gray-900 mt-1">
            {applicantData?.dob
              ? format(String(applicantData?.dob), "dd-MM-yyy")
              : "Not Provided"}
          </h1>
        </div>
        <div>
          <h1 className="text-sm text-gray-600 mt-4 poppins">Location </h1>
          <p>{applicantData?.location || "Not provided"}</p>
        </div>
        <div>
          <h1 className="text-sm text-gray-600 mt-4 poppins">
            More about Him:
          </h1>
          {applicantData?.socialMediaLinks &&
          applicantData.socialMediaLinks.length > 0 ? (
            <ul className="text-sm">
              {applicantData.socialMediaLinks.map(
                (linkObj: any, index: number) => (
                  <li key={index}>
                     {linkObj.socialMedia} :
                    <a className="text-xs ms-1 text-blue-600 underline"
                      href={linkObj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                        {linkObj.link}
                    </a>
                  </li>
                )
              )}
            </ul>
          ) : (
            <p>Not provided</p>
          )}
        </div>
      </div>
      <h1 className="font-semibold text-blue-gray-800 ms-3 mt-4">
        Professional Info
      </h1>
      <div className="ms-3">
        <div>
          <h1 className="text-sm text-gray-600 mt-4 poppins">About Me</h1>
          <h1 className="text-xs w-96 text-black mt-2">
            {applicantData?.about || "Not Provided"}
          </h1>
        </div>
      </div>
      <div className="ms-3 grid grid-cols-2">
        <div>
          <h1 className="text-sm text-gray-600 mt-4 poppins">Current Job</h1>
          <h1 className="text-sm text-black mt-1 font-medium">
            {applicantData?.previousJob || "Not Provided"}
          </h1>
        </div>
        <div className="mb-5">
          <h1 className="text-sm text-gray-600 mt-4 poppins">Skill set</h1>
          <div className="flex flex-wrap gap-x-2">
            {applicantData?.skills ? (
              applicantData?.skills.map((skill: string, idx: number) => (
                <div key={idx}>
                  <h1 className="text-sm text-lightgreen mt-1 font-medium px-2 py-1 rounded-md bg-gray-200">
                    {skill}
                  </h1>
                </div>
              ))
            ) : (
              <>
                <h1>Not Provided</h1>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetialProfile;
