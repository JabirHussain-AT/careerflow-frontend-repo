import React from 'react';
import Modal from 'react-modal';
import { MoreInfoModalProps } from '../../../interface/ICompanyApprovelModal'

Modal.setAppElement('#root'); // Set the root element for accessibility

const MoreInfoModal : React.FC<MoreInfoModalProps> = ({ isOpen, closeModal, company }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="modal-content max-w-2xl mx-auto bg-red p-8 bg-gray-100 border-0 rounded-md"
      overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 " 
    >
      <div className="modal-header  flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold font-sans flex justify-center">Company Details</h2>
        <button
          className="modal-close bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
          onClick={closeModal}
        >
          &times;
        </button>
      </div>
      <div className="modal-body">
        {company && (
          <>
            <div className="mb-4">
              <strong>Company Name:</strong> {company.userName}
            </div>
            <div className="mb-4">
              <strong>Email:</strong> {company.email}
            </div>
            <div className="mb-4">
              <strong>Role:</strong> {company.role}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <strong>Address:</strong> {company.address}
              </div>
              <div>
                <strong>Founded:</strong> {company.founded}
              </div>
              <div>
                <strong>Status:</strong> {company.status}
              </div>
              {/* Add more details as needed */}
            </div>
            <div className="mt-4">
              <strong>LinkedIn:</strong>{' '}
              <a className='text-blue-700 underline font-serif' href={company.linkedIn} target="_blank" rel="noopener noreferrer">
                {company.linkedIn}
              </a>
            </div>
            <div className="mt-4">
              <strong>Total Employees:</strong> {company.totalEmployees}
            </div>
            <div className="mt-4">
              <strong>Vision:</strong> {company.vision}
            </div>
            <div className="mt-4">
              <strong>Website Link:</strong>{' '}
              <a className='text-blue-700 underline font-serif' href={company.websiteLink} target="_blank" rel="noopener noreferrer">
                {company.websiteLink}
              </a>
            </div>
            {/* Add more details as needed */}
          </>
        )}
      </div>
    </Modal>
  );
};

export default MoreInfoModal;
