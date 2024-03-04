import { useParams } from "react-router-dom";

const ApplicantDetialsHiring = () => {
  const { userId } = useParams();

  // Dummy data for testing
  const dummyApplicantData = {
    hiringStage: "inreview", // "shortlisted", "interview", "accepted", "rejected"
    interviewDate: "10 - 13 July, 2021",
    interviewStatus: "assigned",
    shortlistedInfo: "The Applicant has been shortlisted",
    inReviewInfo: "The Applicant is in Inreview stage",
    hiredInfo: "The Applicant has been hired",
    offerLetterStatus: "assigned",
    rejectedInfo: "The Applicant has been Rejected",
    rejectedMailStatus: "Send",
  };

  return (
    <div className="mt-4">
      <h1 className="font-semibold text-blue-gray-800 ms-3">Current Stage</h1>
      <div className="flex">
        <div className={`ms-4 mt-4 -skew-x-12 px-7 ${dummyApplicantData.hiringStage === "inreview" ? 'text-white bg-blue-400' : `${dummyApplicantData.hiringStage === "shortlisted" || "interview" ? 'text-lightgreen' : 'text-gray-600'}`} bg-blue-gray-50 font-semibold py-1`}>
          In-Review
        </div>
        <div className={`ms-4 mt-4 -skew-x-12 px-7 ${dummyApplicantData.hiringStage === "shortlisted" ? 'text-white bg-blue-400' : `${dummyApplicantData.hiringStage !== "inreview" ? 'text-lightgreen ' : 'text-gray-600'}`} bg-blue-gray-50 font-semibold py-1`}>
          Shortlisted
        </div>
        <div className={`ms-4 mt-4 -skew-x-12 px-7 ${dummyApplicantData.hiringStage === "interview" ? 'text-white bg-blue-400' : `${dummyApplicantData.hiringStage !== "inreview" || "shortlisted" ? `${dummyApplicantData.hiringStage === "accepted" || "rejected" ? `${dummyApplicantData.hiringStage === "inreview" || "shortlisted" ? 'text-gray-600' : 'text-lightgreen'}` : ``}` : 'text-lightgreen'}`} bg-blue-gray-50 ${dummyApplicantData.hiringStage === "accepted" ? 'text-lightgreen' : 'text-gray-600'} ${dummyApplicantData.hiringStage === "rejected" ? 'text-lightgreen' : 'text-gray-600'} font-semibold py-1`}>
          Interview
        </div>
        <div className={`ms-4 mt-4 -skew-x-12 px-7 ${dummyApplicantData.hiringStage === "accepted" ? 'text-white bg-green-600' : `${dummyApplicantData.hiringStage === "rejected" ? 'bg-red-600 text-white' : `${dummyApplicantData.hiringStage !== ("shortlisted") || ("inreview") || ("interview") ? 'text-gray-600' : ' text-lightgreen'}`}`} bg-blue-gray-50 font-semibold py-1`}>
          Hired/Declined
        </div>
      </div>
      <div>
        {dummyApplicantData.hiringStage === "interview" ? (
          <div className="grid grid-cols-2 mt-4">
            <div>
              <h1 className="text-gray-800 ms-3 text-sm font-semibold">Stage Info</h1>
              <h1 className="text-xs ms-3 mt-2 text-gray-600">Interview Date</h1>
              <h1 className="text-xs ms-3 mt-1 text-gray-900">{dummyApplicantData.interviewDate}</h1>
            </div>
            <div>
              <h1 className="text-gray-700 text-xs mt-6">Interview Status</h1>
              <h1 className={`rounded-lg bg-blue-50 px-4 w-24 mt-1 mb-4 text-blue-900`}>{dummyApplicantData.interviewStatus}</h1>
            </div>
          </div>
        ) : dummyApplicantData.hiringStage === "shortlisted" ? (
          <div>
            <h1 className="text-gray-800 ms-3 text-sm mt-4 font-semibold">Stage Info</h1>
            <h1 className="text-xs ms-3 mt-2 text-gray-600">{dummyApplicantData.shortlistedInfo}</h1>
          </div>
        ) : dummyApplicantData.hiringStage === "inreview" ? (
          <div>
            <h1 className="text-gray-800 ms-3 text-sm mt-4 font-semibold">Stage Info</h1>
            <h1 className="text-xs ms-3 mt-2 text-gray-600">{dummyApplicantData.inReviewInfo}</h1>
          </div>
        ) : dummyApplicantData.hiringStage === "accepted" ? (
          <div className="grid grid-cols-2 mt-4">
            <div>
              <h1 className="text-gray-800 ms-3 text-sm font-semibold">Stage Info</h1>
              <h1 className="text-xs ms-3 mt-2 text-gray-600">{dummyApplicantData.hiredInfo}</h1>
            </div>
            <div>
              <h1 className="text-gray-700 text-xs mt-6">Offer Letter Status</h1>
              <h1 className={`rounded-lg bg-blue-50 px-4 w-24 mt-1 mb-4 text-blue-900`}>{dummyApplicantData.offerLetterStatus}</h1>
            </div>
          </div>
        ) : dummyApplicantData.hiringStage === "rejected" ? (
          <div className="grid grid-cols-2 mt-4">
            <div>
              <h1 className="text-gray-800 ms-3 text-sm font-semibold">Stage Info</h1>
              <h1 className="text-xs ms-3 mt-2 text-gray-600">{dummyApplicantData.rejectedInfo}</h1>
            </div>
            <div>
              <h1 className="text-gray-700 text-xs mt-6">Rejected Mail Status</h1>
              <h1 className={`rounded-lg bg-blue-50 px-4 w-20 mt-1 mb-4 text-blue-900`}>{dummyApplicantData.rejectedMailStatus}</h1>
            </div>
          </div>
        ) : (
          <>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplicantDetialsHiring;
