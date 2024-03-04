import React from 'react';
import Modal from 'react-modal';
import { MoreInfoModalPropsForUsers } from '../../../interface/ICompanyApprovelModal';

Modal.setAppElement('#root'); // Set the root element for accessibility

const MoreInfoModalUsers: React.FC<MoreInfoModalPropsForUsers> = ({ isOpen, closeModal, user }) => {
  console.log('User:', user);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="modal-content w-8/12 md:w-9/12 lg:w-10/12 xl:w-11/12 2xl:w-10/12 mx-auto bg-gray-200 p-8 rounded-md shadow-lg"
      overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30"
    >
      <div className='w-full'>
        <div className='flex justify-between items-center'>
          <div>
            <strong className="text-lg text-gray-800">Name:</strong> 
            <p className='font-serif text-sm bg-gray-100 px-3 py-1 rounded-md'>
              {user?.userName || 'N/A'}
            </p>
          </div>
          <div>
            <strong className="text-lg text-gray-800">Email:</strong> 
            <p className='bg-gray-100 font-serif text-sm py-1 px-3 rounded-md'>
              {user?.email || 'N/A'}
            </p>
          </div>
          <div>
            <strong className="text-lg text-gray-800">Date Of Birth:</strong> 
            <p className='bg-gray-100 font-serif text-sm py-1 px-3 rounded-md'>
              {user?.dob || 'Not Available'}
            </p>
          </div>
        </div>
        
        <div className='flex justify-between mt-3 items-center gap-5'>
          <div>
            <strong className="text-lg text-gray-800">Address:</strong> 
            <p className='font-serif text-sm bg-gray-100 px-3 h-auto rounded-md py-1'>
              {user?.about || 'Not Available'}
            </p>
          </div>
          <div>
            <strong className="text-lg text-gray-800">Role:</strong> 
            <p className='bg-gray-100 font-serif text-sm py-1 px-3 rounded-md'>
              {user?.role}
            </p>
          </div>
          <div>
            <strong className="text-lg text-gray-800">Status:</strong> 
            <p className='bg-gray-100 font-serif text-sm py-1 px-3 rounded-md'>
              {user?.status || "Not Available"}
            </p>
          </div>
        </div>

        <div className='flex justify-center items-start gap-5 mt-4'>
          <div>
            <strong className="text-lg text-gray-800">Skills:</strong>
            {user?.skills && user.skills.map((skill, index) => (
              <span key={index} className="mr-2 bg-blue-100 px-2 py-1 rounded-md">
                {skill}
              </span>
            ))}
          </div>
          <div>
            <strong className="text-lg text-gray-800">Educational qualifications:</strong>
            {user?.education && user.education.map((edu, index) => (
              <div key={index} className="mb-2">
                <strong>{edu?.degree}</strong> - {edu?.institution}, {edu?.year}
              </div>
            ))}
          </div>
          <div>
            <strong className="text-lg text-gray-800">Qualifications:</strong>
            {/* Add user's qualifications here */}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MoreInfoModalUsers;
