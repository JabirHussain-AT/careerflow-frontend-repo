import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IoMdArrowRoundBack, IoIosPhonePortrait } from 'react-icons/io';
import { MdMessage, MdEmail } from 'react-icons/md';
import { fetchJob, getUser } from '@/redux/actions/userActions';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';

interface ApplicantData {
  profilePic: string;
  userName: string;
  previousJob: string;
  phoneNumber : number | string 
  email: string;
  phone: string;
}


const ViewApplicantDetialSideBar: React.FC = () => {
  const [userData, setUserData] = useState<ApplicantData | null>(null);
  const [applicantData , setApplicantData ] = useState<any>({})
  const [jobData, setJobData] = useState<any | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const { jobId, applicantId } = useParams();

  useEffect(() => {
    const fetchingFunction = async () => {
      try {
        const jobData = await fetchJob(jobId);
        setApplicantData(()=>{
            return jobData.data?.applicants?.find((application : any )=>{
                    const data =  application.applicantId === applicantId ? application : null
                    // console.log("🚀 ~ returnjobData.data?.applicants?.filter ~ data:", data)
                    return  data
            })
        })
        const userData = await getUser(applicantId);

        setJobData(jobData.data);
        setUserData(userData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchingFunction();
  }, [jobId, applicantId]);

 
  const getDateDifference = (appliedDate: string): number => {
    const providedDateObject = new Date(appliedDate);

    if (isNaN(providedDateObject.getTime())) {
      console.error('Invalid date provided');
      return 0;
    }

    const today = new Date();

    const timeDifference: number = providedDateObject.getTime() - today.getTime();

    const daysDifference = Math.ceil(Math.abs(timeDifference / (1000 * 60 * 60 * 24)));

    return daysDifference;
  };

  return (
    <div className="border rounded-md mt-4">
      <div className="flex gap-x-6 ms-5">
        <div>
          <img src={userData?.profilePic } alt="" className="w-16 mt-3 h-16 border rounded-full" />
        </div>
        <div>
          <h1 className="font-serif font-semibold text-lg mt-3 text-blue-gray-900">{userData?.userName}</h1>
          <h1 className="text-gray-600 text-sm">{userData?.previousJob}</h1>
        </div>
      </div>

      <div className="bg-blue-gray-50 mt-4 mb-4 mx-4 rounded-md">
        <div className="flex justify-between border-b-2 mx-3 border-gray-300">
          <h1 className="text-xs py-2">Applied Job</h1>
          <h1 className="text-xs text-gray-600 py-2">{getDateDifference(applicantData?.appliedDate)} Days ago</h1>
        </div>
        <div>
          <h1 className="poppins text-sm font-semibold text-md text-blue-gray-900 mx-3 mt-2">{jobData?.jobTitle}</h1>
          <div className="flex gap-x-1">
            <h1 className="ms-3 text-sm text-gray-700 mt-1 ">{jobData?.category}</h1>
            <h1 className="text-sm font-extrabold text-gray-700 mt-1 ">.</h1>
            <h1 className="text-sm text-gray-700 mt-1 mb-4">{jobData?.jobType}</h1>
          </div>
        </div>
      </div>
      <div className="bg-blue-gray-50 mt-4 mb-4 rounded-md mx-4">
        <div className="flex justify-between mx-3  border-gray-300">
          <h1 className="text-sm py-2">Stage</h1>
          <h1 className="text-sm text-blue-400 font-semibold py-2">{applicantData && applicantData?.hiringStage || 'stage'}</h1>
        </div>
        <div>
        <div className="flex gap-x-1">
            <div className={`${['Applyed', 'inreview','shortlisted','interview','accepted'].includes(applicantData?.hiringStage) ? 'bg-blue-600' : 'bg-gray-400'} w-14 h-2 mt-2 ms-3`}></div>
            <div className={`${['inreview','shortlisted','interview','accepted'].includes(applicantData?.hiringStage) ? 'bg-blue-600' : 'bg-gray-400'} w-14 h-2 mt-2`}></div>
            <div className={`${['shortlisted', 'interview','accepted'].includes(applicantData?.hiringStage) ? 'bg-blue-600' : 'bg-gray-400'} w-14 h-2 mt-2`}></div>
            <div className={`${['interview', 'accepted',].includes(applicantData?.hiringStage) ? 'bg-blue-600' : 'bg-gray-400'}  w-14 h-2 mt-2`}></div>
            <div className={`${applicantData?.hiringStage === 'accepted' ? 'bg-blue-600' : 'bg-gray-400'} w-14 h-2 mt-2 mb-4 me-3`}></div>
          </div>
        </div>
      </div>
      <div className="flex w-full gap-x-2 h-full">
        <div className="border-2 w-5/6 rounded-md  ms-4 flex justify-center h-full py-1 ">
          <h1 className="text-lightgreen font-bold"> Message </h1>
        </div>
        <div className="border-2 w-1/6 rounded-md  flex me-4 text-lightgreen text-xl justify-center h-full py-1.5 mb-4">
          <h1><MdMessage /></h1>
        </div>
      </div>
      <hr className="mx-4" />
      <div>
        <h1 className="text-lg font-semibold text-blue-gray-800 mx-4 mt-3 poppins">Contact</h1>
      </div>
      <div className="flex mt-5 gap-x-3 ms-4 text-gray-600">
        <MdEmail />
        <h1 className="text-sm">Email</h1>
      </div>
      <h1 className="mx-11 text-sm">{userData?.email}</h1>
      <div className="flex mt-5 gap-x-3 ms-4 text-gray-600">
        <IoIosPhonePortrait />
        <h1 className="text-sm">Phone</h1>
      </div>
      <h1 className="mx-11 text-sm">{userData?.phoneNumber || 'Not Provided'}</h1>
    </div>
  );
};

export default ViewApplicantDetialSideBar;
