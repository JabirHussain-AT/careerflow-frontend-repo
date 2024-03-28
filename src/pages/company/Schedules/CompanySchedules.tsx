import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { IUserSelector } from "@/interface/IUserSlice";
import { fetchComJobs } from "@/redux/actions/companyActions";
import { parseISO, format } from "date-fns";
import { IJob } from "@/interface/IJob";
import { useNavigate } from "react-router-dom";

const CompanySchedules: React.FC = () => {
  const [todayMeetings, setTodayMeetings] = useState<any[]>([]);
  const [pendingMeetings, setPendingMeetings] = useState<any[]>([]);
  const { user } = useSelector((state: IUserSelector) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchComJobs(user?._id);

        // Filter data based on the presence of schedule and interviewType
        const filteredData = data?.data.filter((job: IJob) => {
          if (job?.applicants?.length > 0) {
            return job.applicants.some((applicant: any) => {
              return applicant?.schedule && applicant?.schedule.InterviewType;
            });
          }
          return false;
        });

        // Separate meetings into today's and pending meetings
        const today = new Date();
        const todayDateString = format(today, "yyyy-MM-dd");

        const todayMeetingsData: any[] = [];
        const pendingMeetingsData: any[] = [];

        filteredData?.forEach((job: IJob) => {
          job.applicants.forEach((applicant: any) => {
            if (applicant?.schedule && applicant?.schedule.InterviewType) {
              const interviewDate = format(
                parseISO(applicant.schedule.date),
                "yyyy-MM-dd"
              );

              const meeting = {
                id: job._id,
                applicantName: applicant.applicantName,
                applicantId: applicant.applicantId,
                Date: parseISO(applicant.schedule.date),
                Time: applicant?.schedule.time,
                roomId: applicant?.schedule.InterviewRoom,
                type: applicant.schedule.InterviewType,
                interveiwName: applicant.schedule.InterviewName,
                jobTitle: job.jobTitle,
              };

              if (interviewDate === todayDateString) {
                todayMeetingsData.push(meeting);
              } else {
                pendingMeetingsData.push(meeting);
              }
            }
          });
        });

        // Sort meetings based on time
        todayMeetingsData.sort((a, b) => a.Time.localeCompare(b.Time));
        pendingMeetingsData.sort((a, b) => a.Time.localeCompare(b.Time));

        setTodayMeetings(todayMeetingsData);
        setPendingMeetings(pendingMeetingsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div>
        <div className="w-full">
          <p className="text-2xl font-sans p-5 font-bold underline">
            Scheduled <span className="text-blue-500">Meetings</span>{" "}
          </p>
        </div>
        <div>
          <p className="font-thin pl-5 text-xl">Today - Meetings</p>
          <div className="flex flex-wrap justify-start py-5 px-5">
            {todayMeetings.length === 0 && (
              <p className="text-red-500 font-bold">
                No meetings scheduled for today.
              </p>
            )}
            {/* Render today's meetings */}
            {todayMeetings.map((meeting: any, index: number) => (
              <div
                key={index}
                className="w-1/4 h-64 bg-white rounded-md border border-blue-500"
              >
                <div className="flex justify-around p-5">
                  <img className="rounded-full w-10 h-10 " src="" alt="dp" />
                  <div>
                    <p className="text-sans ">{meeting.applicantName}</p>
                    <h1 className="text-sm  text-gray-500">
                      {meeting.jobTitle}
                    </h1>
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-xs">
                    <strong className="font-semibold text-sm">
                      Test Name :
                    </strong>{" "}
                    {meeting.InterviewName}
                  </div>
                  <div className="text-xs">
                    <strong className="font-semibold text-sm">
                      Job Title :
                    </strong>{" "}
                    {meeting.jobTitle}
                  </div>
                  <div className="text-xs">
                    <strong className="font-semibold text-sm">Date :</strong>{" "}
                    {format(meeting.Date, "yyyy-MM-dd")}
                  </div>
                  <div className="text-xs">
                    <strong className="font-semibold text-sm">Time :</strong>{" "}
                    {meeting.Time}
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() =>
                      navigate(
                        `/company/interview-meet/${meeting.roomId}/${meeting?.id}/${meeting?.applicantId}`
                      )
                    }
                    className="px-10 py-1 text-sm rounded-xl bg-blue-500 text-white hover:bg-blue-800"
                  >
                    Host Interview
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* pending section */}
        <div>
          <p className="font-thin pl-5 text-xl">Pending - Meetings</p>
          <div className="flex flex-wrap justify-start py-5 px-5">
            {pendingMeetings.length === 0 && (
              <p className="text-red-500 font-bold">No pending meetings.</p>
            )}
            {/* Render pending meetings */}
            {pendingMeetings.map((meeting: any, index: number) => (
              <div
                key={index}
                className="w-1/4 h-64 bg-white rounded-md border border-blue-500"
              >
                <div className="flex justify-around p-5">
                  <img className="rounded-full w-10 h-10 " src="" alt="dp" />
                  <div>
                    <p className="text-sans ">{meeting.applicantName}</p>
                    <h1 className="text-sm  text-gray-500">
                      {meeting.jobTitle}
                    </h1>
                  </div>
                </div>
                <div className="p-5">
                  {meeting?.interviewName && (
                    <div className="text-xs">
                      <strong className="font-semibold text-sm">
                        Test Name :
                      </strong>{" "}
                      {meeting.InterviewName}
                    </div>
                  )}
                  <div className="text-xs">
                    <strong className="font-semibold text-sm">
                      Job Title :
                    </strong>{" "}
                    {meeting.jobTitle}
                  </div>
                  <div className="text-xs">
                    <strong className="font-semibold text-sm">Date :</strong>{" "}
                    {format(meeting.Date, "yyyy-MM-dd")}
                  </div>
                  <div className="text-xs">
                    <strong className="font-semibold text-sm">Time :</strong>{" "}
                    {meeting.Time}
                  </div>
                </div>
                <div className="flex justify-center">
                  <button className="px-10 py-1 text-sm rounded-xl bg-blue-500 text-white hover:bg-blue-800 disabled:">
                    Join Later
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanySchedules;
