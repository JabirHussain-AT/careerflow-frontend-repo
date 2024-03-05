 import { fetchJob, getUser } from '@/redux/actions/userActions';
import React , { useEffect  , useState } from 'react'
 import { useParams } from 'react-router-dom'

const ApplicantDetialsResume : React.FC  = () => {
  const { jobId , applicantId  } = useParams()
  const [ job , setJob  ] = useState()
  const [ appliedData , setAppliedData  ] = useState<any>()
  const [ applicant , setApplicant ] = useState ()


  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchJob(jobId);
        setJob(res.data);
        setAppliedData(()=>{
          return res?.data?.applicants.find((applicants : any)=>{
            return applicants.applicantId === applicantId ? applicants : null
          })
        })

        if (job) {
          const applicantDataFetch = await getUser(applicantId);
          setApplicant(applicantDataFetch.data);
        }
      } catch (error) {
        console.error("Error fetching company jobs:", error);
      }
    };

    fetchData();
  }, [jobId, applicantId]);

  return (
     <div>
      <iframe src={appliedData?.resume || ''} height={"500"} width={"100%"}></iframe>
    </div>
  )
}

export default ApplicantDetialsResume