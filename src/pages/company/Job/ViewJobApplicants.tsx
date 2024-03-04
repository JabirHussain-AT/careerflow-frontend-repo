import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
interface Applicant {
  id: number;
  name: string;
  email: string;
  appliedDate: string;
  hiringStage: string;
}

const ViewJobApplicants: React.FC = () => {
  // Sample data, replace with your actual data
  const applicants: Applicant[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', appliedDate: '2024-03-04', hiringStage: 'Interview' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', appliedDate: '2024-03-05', hiringStage: 'In-Review' },
    // Add more applicants as needed
  ];
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredApplicants, setFilteredApplicants] = useState<Applicant[]>(applicants);
  const [selectedHiringStage, setSelectedHiringStage] = useState<string>('');

  const getHiringStageColor = (hiringStage: string): string => {
    switch (hiringStage) {
      case 'Interview':
        return 'px-2 py-1 border border-blue-400 text-blue-500 rounded'; // Customize color as needed
      case 'In-Review':
        return 'px-2 py-1 border border-yellow-400 text-yellow-500 rounded'; // Customize color as needed
      // Add more cases for other hiring stages
      default:
        return '';
    }
  };

  const handleFilter = () => {
    const filtered = applicants.filter(applicant =>
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredApplicants(filtered);
  };

  return (
    <div className="container mx-auto my-8">
      <div className="mb-4">
        <h1 className="text-3xl font-bold mb-2">Node js Developer </h1>
        <div className="flex w-full justify-between  items-center space-x-4">
            <div className='flex gap-3'>
                <div className='w-auto'>
                    <h1 className="font-semibold font-sans  "> Pending </h1>
                    {   }
                    <div className='h-1  bg-orange-400'></div>
                </div>
                <div className='auto'>
                    <h1 className="font-semibold font-sans  "> In-Review </h1>
                    <div className='h-1  bg-orange-400'></div>
                </div>
                <div className='auto'>
                    <h1 className="font-semibold font-sans  "> Short Listed </h1>
                    <div className='h-1  bg-yellow-400'></div>
                </div>
                <div className='auto'>
                    <h1 className="font-semibold font-sans  "> Interview </h1>
                    <div className='h-1  bg-blue-400'></div>
                </div>
                <div className='auto'>
                    <h1 className="font-semibold font-sans  ">Hired</h1>
                    <div className='h-1  bg-green-400'></div>
                </div>
                <div className='auto'>
                    <h1 className="font-semibold font-sans  "> Rejected  </h1>
                    <div className='h-1  bg-red-400'></div>
                </div>
                  
                    
            </div>
          <input
            type="text"
            placeholder="Search by name"
            className="border border-gray-300 p-2"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleFilter(); // Call handleFilter on every change
            }}
          />
        </div>
      </div>

      {filteredApplicants.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Sr No</th>
              <th className="py-2 px-4 border-b">Applicant Name</th>
              <th className="py-2 px-4 border-b">Applicant Email</th>
              <th className="py-2 px-4 border-b">Applied Date</th>
              <th className="py-2 px-4 border-b">Hiring Stage</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplicants.map((applicant: Applicant, index: number) => (
              <tr key={applicant.id}>
                <td className={`py-2 px-4 border-b`}>{index + 1}</td>
                <td className={`py-2 px-4 border-b`}>{applicant.name}</td>
                <td className={`py-2 px-4 border-b`}>{applicant.email}</td>
                <td className={`py-2 px-4 border-b `}>{applicant.appliedDate}</td>
                <td className={`py-2 px-4 border-b text-black`}>
                  <p className={`text-center font-semibold text-black bg-white ${getHiringStageColor(applicant.hiringStage)}`}>
                    {applicant.hiringStage}
                  </p>
                </td>
                <td className={`py-2 px-4 border-b`}>
                  <button 
                //   onClick={()=>navigate(`/company/jobApplicant/viewProfile/:${jobId}/:${userId}`)}
                  onClick={()=>navigate(`/company/jobApplicant/viewProfile/121212/57r4445`)}
                   className="text-blue-500 hover:underline">
                    View More <ArrowIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No applicants available for this job.</p>
      )}
    </div>
  );
};

const ArrowIcon: React.FC = () => <span>&rarr;</span>;

export default ViewJobApplicants;
