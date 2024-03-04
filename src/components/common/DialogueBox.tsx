import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const DialogueBox = ({ isOpen, onClose, onSubmit }: { isOpen: boolean; onClose: any; onSubmit: any }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    if (inputValue.trim() !== '') {
      onSubmit(inputValue);
      onClose();
    }
  };

  return (
    <div>
      {isOpen && (
        <Dialog open={isOpen}>
          {/* <DialogTrigger> */}
            {/* No close icon or button here */}
          {/* </DialogTrigger> */}
          <DialogContent>
            <DialogHeader>
              <DialogTitle className='px-2 py-3'>Please Enter Your Company Name:</DialogTitle>
              <form>
                <input
                  className='px-2 py-2 w-full rounded-lg'
                  type="text"
                  minLength={4}
                  maxLength={20}
                  required
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Eg: Xyz Techno Pvt Ltd"
                />
                <button className="px-3 rounded-md w-full my-2 text-white py-1 bg-gray-600 hover:bg-black font-serif" onClick={handleSubmit}>
                  Submit
                </button>
              </form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default DialogueBox;
