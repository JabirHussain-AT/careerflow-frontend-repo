import React, { ReactNode, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DropdownProps {
  button: ReactNode;
  title: string;
  options: string[];
  onChange: (selectedOption: string) => void;
}

const Dropdown = ({ button, title, options, onChange }: DropdownProps) => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onChange(option);
  };

  return (
    <div className='inline-block relative'>
      <DropdownMenu>
        <DropdownMenuTrigger>{button}</DropdownMenuTrigger>
        <DropdownMenuContent className='origin-top-right bg-white border border-gray-200 mt-2 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <DropdownMenuLabel className='block px-4 py-2 text-sm text-gray-700'>{title}</DropdownMenuLabel>
          <DropdownMenuSeparator className='border-t border-gray-200'></DropdownMenuSeparator>
          {options.map((option) => (
            <DropdownMenuItem
              key={option}
              className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${selectedOption === option ? 'bg-gray-100' : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Dropdown;
