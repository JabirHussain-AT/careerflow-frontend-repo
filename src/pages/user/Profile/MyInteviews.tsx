import { IUserSelector } from "@/interface/IUserSlice";
import { getUserApplications } from "@/redux/actions/userActions";
import { AppDispatch } from "@/redux/store";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { parseISO, format, differenceInSeconds } from "date-fns";

const MyInterviews : React.FC  = () => {
  const [jobInterviews, setJobInterViews] = useState<any[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()

  const { user } = useSelector((state: IUserSelector) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getUserApplications(user?._id));
        const userDataFromServer = response.payload.data;

        // Filter job applications based on the presence of schedule in applicants
        const filteredApplications = userDataFromServer.filter((job: any) => {
          return job.applicants.some((applicant: any) => applicant.schedule);
        });

        setJobInterViews(filteredApplications);
      } catch (error) {
        console.error("Error fetching user applications:", error);
      }
    };

    fetchData();
  }, [dispatch, user?._id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setJobInterViews(prevInterviews => {
        return prevInterviews.map(interview => {
          const countdown = calculateCountdown(interview.applicants[0].schedule.date);
          return {
            ...interview,
            countdown
          };
        });
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const calculateCountdown = (date: string) => {
    const targetDate = parseISO(date);
    const now = new Date();
    const difference = differenceInSeconds(targetDate, now);

    if (difference < 0) {
      return "Its Interview time ";
    }

    const days = Math.floor(difference / (24 * 60 * 60));
    const hours = Math.floor((difference % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((difference % (60 * 60)) / 60);
    const seconds = difference % 60;



    return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
  };

  const handleInterViewMeet = (roomId: string) => {
    navigate(`/interview-meet/${roomId}`);
  };
  

  return (
    <div className="container mx-auto px-4 pb-5">
        <h1 className="text-3xl font-bold mb-8 pb-4">Scheduled <span className="text-blue-400 ">Interviews</span>  </h1>
        {jobInterviews.length === 0 ? (
            <p className="text-gray-700">Currently no interviews scheduled</p>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {jobInterviews.map((interview, index) => (
                    <div key={index} className="max-w-sm rounded-lg overflow-hidden shadow-lg border border-blue-400  bg-white duration-500 hover:shadow-xl hover:scale-90">
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-lg font-semibold text-blue-500">{interview.applicants[0].schedule.InterviewType} at    {interview?.companyId?.userName} </div>
                            </div>
                            <div className="text-xl font-semibold">{interview.applicants[0].schedule.interviewName}</div>
                            <div className="text-sm pb-4 flex gap-3 text-gray-600 mb-2">
                                <img className='w-11 h-10 rounded-full' src={interview?.companyId?.logo} alt="" />
                                <div className="">
                                {interview?.companyId?.userName }
                                <br />
                                {interview?.companyId?.email }
                                </div>
                            </div>
                            <div className="text-sm text-gray-600">
                                <span className="font-semibold">Date:</span> {format(parseISO(interview.applicants[0].schedule.date), 'MMMM dd, yyyy')}<br />
                                <span className="font-semibold">Time:</span> {interview.applicants[0].schedule.time}
                            </div>
                            <div className="m-4">
                                {differenceInSeconds(parseISO(interview.applicants[0].schedule.date), new Date()) <= 5 * 60 ? (
                                    <div onClick={()=>handleInterViewMeet(interview.applicants[0].schedule?.InterviewRoom)} className="bg-blue-500 animate-out hover:bg-blue-700 text-white font-mono  rounded-md px-4 py-1 mx-4 text-sm text-center">Join Now</div>
                                ) : (
                                    <div className="bg-gray-300 text-gray-600 font-mono  rounded-md px-4 py-1 mx-4 text-sm text-center">Join Later</div>
                                )}
                            </div>
                            {/* count down */}
                            <div className="text-xs text-gray-600">{interview.countdown}</div>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  );
};

export default MyInterviews;
