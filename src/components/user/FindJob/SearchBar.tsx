import React, { useState } from 'react';
import { BsSearch, BsSliders } from 'react-icons/bs';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Call the onSearch prop with the current search query
    onSearch(searchQuery);
  };

  return (
    <div>
      <div className="h-8"></div>
      <div className="flex justify-center">
        <div className="w-11/12 rounded border-2 bg-white items-center px-3 py-1 flex gap-4">
          <BsSearch />
          <input
            className="w-full p-3 rounded-sm h-8 focus:outline-blue-400 focus:outline-dotted font-serif "
            placeholder="Search By: Job Title..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex gap-3 w-auto">
              {/* <div className="flex bg-gray-300 px-3 gap-2 font-sans items-center">
                  <BsSliders />
                <button className="rounded-sm font-serif">Filter</button>
              </div>  */}
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-serif px-5 py-1 w-28"
              onClick={handleSearch}
            >
              Find Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
