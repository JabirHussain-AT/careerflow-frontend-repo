import { useState } from 'react';
import LOGO from '../../../assets/googleIcon.png';
import Modal from '../../common/ModalBox';

const ApplicantInterviewSchedule = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [interviewDateTime, setInterviewDateTime] = useState<string>("");
  const [testType, setTestType] = useState<string>("");
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");

  const handleScheduleInterview = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle scheduling logic here
    // This is a placeholder, you can replace it with your actual logic
    console.log('Scheduling interview...');
    console.log('Test Type:', testType);
    console.log('Interview Date and Time:', interviewDateTime);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="grid grid-cols-2 mt-4">
        <div>
          <h1 className="text-gray-800 ms-3 text-sm font-semibold">Interview List</h1>
        </div>
        <div>
          <h1 onClick={() => setIsModalOpen(true)} className="font-semibold hover:cursor-pointer text-sm text-lightgreen">+ Add Schedule Interview</h1>
        </div>
      </div>
      <div className="border mt-5 flex justify-between flex-wrap">
        <div className='ms-3 mt-4 flex gap-x-3'>
          <img src={LOGO} alt="" className='w-12 h-12 rounded-full border' />
          <div className='mt-2'>
            <h1 className='text-sm text-blue-gray-800 font-semibold'>Interview</h1>
            <h1 className='text-xs text-gray-600'></h1>
          </div>
        </div>
        <div className='mt-5 md:me-40'>
          <h1 className='text-sm font-semibold text-gray-800'>10 AM - 03/04/2023 </h1>
          <h1 className='text-xs'>RoomId . 432211 <span>company name : Ticker </span> </h1>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div>
          <form onSubmit={handleScheduleInterview}>
            <div>
              <label htmlFor="" className='text-gray-600 text-sm font-semibold'>Test Type</label>
              <input required name="testType" className="border rounded-md py-2 px-2 mt-2 w-full outline-none" placeholder='Enter Test Type' value={testType} onChange={(e) => setTestType(e.target.value)} />
            </div>
            <div className='mt-4'>
              <label htmlFor="" className='text-gray-600 text-sm font-semibold'>Select Date and Time</label>
              <input required type="datetime-local" className='border rounded-md py-2 px-2 w-full outline-none' value={interviewDateTime} onChange={(e) => setInterviewDateTime(e.target.value)} min={new Date().toISOString().split("Z")[0]} />
            </div>
            <div className='mt-4 flex justify-center'>
              <button type="submit" className='bg-lightgreen text-white font-semibold text-center px-3 py-2 rounded-md'>Schedule</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ApplicantInterviewSchedule;
