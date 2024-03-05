import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { fetchJob, getUser } from "@/redux/actions/userActions";

const ApplicantDetialsHiring = () => {
  const { jobId, applicantId } = useParams();
  const [job, setJob] = useState();
  const [appliedData, setAppliedData] = useState<any>();
  const [applicant, setApplicant] = useState();
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchJob(jobId);
        setJob(res?.data);
        const foundApplicant = res?.data.applicants.find((application: any) => application.applicantId === applicantId);
        console.log('Found Applicant:', foundApplicant);
        setAppliedData(() => (foundApplicant || {}));
      } catch (error) {
        console.error("Error fetching company jobs:", error);
      }
    };
  
    fetchData();
  }, [jobId, applicantId]);
  
  
  
console.log(appliedData?.hiringStage,'appliedData.hiringStage')

    return (
    <div className="mt-4">
      <h1 className="font-semibold text-blue-gray-800 ms-3">Current Stage</h1>
      <div className="flex">
        <div
          className={`ms-4 mt-4 -skew-x-12  px-7 ${
            appliedData?.hiringStage === "inreview"
              ? "text-white bg-blue-400"
              : appliedData?.hiringStage === "shortlisted" || appliedData?.hiringStage === "interview"
              ? "text-lightgreen"
              : "text-gray-600"
          } bg-blue-gray-50 font-semibold py-1`}
        >
          In-Review
        </div>
        <div
          className={`ms-4 mt-4 -skew-x-12 px-7 ${
            appliedData?.hiringStage === "shortlisted"
              ? "text-white bg-blue-400"
              : !(appliedData?.hiringStage === "inreview")
              ? "text-lightgreen "
              : "text-gray-600"
          } bg-blue-gray-50 font-semibold py-1`}
        >
          Shortlisted
        </div>
        <div
          className={`ms-4 mt-4 -skew-x-12 px-7 ${
            appliedData?.hiringStage === "interview"
              ? "text-white bg-blue-400"
              : !(appliedData?.hiringStage === "inreview" || appliedData?.hiringStage === "shortlisted")
              ? appliedData?.hiringStage === "accepted" || appliedData?.hiringStage === "rejected"
                ? "text-gray-600"
                : "text-lightgreen"
              : "text-lightgreen"
          } bg-blue-gray-50 ${
            appliedData?.hiringStage === "accepted" ? "text-lightgreen" : "text-gray-600"
          } ${
            appliedData?.hiringStage === "rejected" ? "text-lightgreen" : "text-gray-600"
          } font-semibold py-1`}
        >
          Interview
        </div>
        <div
          className={`ms-4 mt-4 -skew-x-12 px-7 ${
            appliedData?.hiringStage === "accepted"
              ? "text-white bg-green-600"
              : appliedData?.hiringStage === "rejected"
              ? "bg-red-600 text-white"
              : !["shortlisted", "inreview", "interview"].includes(appliedData?.hiringStage)
              ? "text-gray-600"
              : "text-lightgreen"
          } bg-blue-gray-50 font-semibold py-1`}
        >
          Hired/Declined
        </div>
      </div>
      <div>
        {appliedData?.hiringStage === "interview" ? (
          <div className="grid grid-cols-2 mt-4">
            <div>
              <h1 className="text-gray-800 ms-3 text-sm font-semibold">
                Stage Info
              </h1>
              <h1 className="text-xs ms-3 mt-2 text-gray-600">
                Interview Date
              </h1>
              <h1 className="text-xs ms-3 mt-1 text-gray-900">
                {appliedData.interviewDate}
              </h1>
            </div>
            <div>
              <h1 className="text-gray-700 text-xs mt-6">Interview Status</h1>
              <h1
                className={`rounded-lg bg-blue-50 px-4 w-24 mt-1 mb-4 text-blue-900`}
              >
                {/* {appliedData.interviewStatus} */}
              </h1>
            </div>
          </div>
        ) : appliedData?.hiringStage === "shortlisted" ? (
          <div>
            <h1 className="text-gray-800 ms-3 text-sm mt-4 font-semibold">
              Stage Info
            </h1>
            <h1 className="text-xs ms-3 mt-2 text-gray-600">
              {/* {appliedData.shortlistedInfo} */}
            </h1>
          </div>
        ) : appliedData?.hiringStage === "inreview" ? (
          <div>
            <h1 className="text-gray-800 ms-3 text-sm mt-4 font-semibold">
              Stage Info
            </h1>
            <h1 className="text-xs ms-3 mt-2 text-gray-600">
              {/* {appliedData.inReviewInfo} */}
            </h1>
          </div>
        ) : appliedData?.hiringStage === "accepted" ? (
          <div className="grid grid-cols-2 mt-4">
            <div>
              <h1 className="text-gray-800 ms-3 text-sm font-semibold">
                Stage Info
              </h1>
              <h1 className="text-xs ms-3 mt-2 text-gray-600">
                {/* {appliedData.hiredInfo} */}
              </h1>
            </div>
            <div>
              <h1 className="text-gray-700 text-xs mt-6">
                Offer Letter Status
              </h1>
              <h1
                className={`rounded-lg bg-blue-50 px-4 w-24 mt-1 mb-4 text-blue-900`}
              >
                {/* {appliedData.offerLetterStatus} */}
              </h1>
            </div>
          </div>
        ) : appliedData?.hiringStage === "rejected" ? (
          <div className="grid grid-cols-2 mt-4">
            <div>
              <h1 className="text-gray-800 ms-3 text-sm font-semibold">
                Stage Info
              </h1>
              <h1 className="text-xs ms-3 mt-2 text-gray-600">
                {/* {appliedData.rejectedInfo} */}
              </h1>
            </div>
            <div>
              <h1 className="text-gray-700 text-xs mt-6">
                Rejected Mail Status
              </h1>
              <h1
                className={`rounded-lg bg-blue-50 px-4 w-20 mt-1 mb-4 text-blue-900`}
              >
                {/* {appliedData.rejectedMailStatus} */}
              </h1>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ApplicantDetialsHiring;
