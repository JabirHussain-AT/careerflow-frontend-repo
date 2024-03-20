import React  from 'react'

interface CardsProps {
    text: string;
    icon: React.ComponentType;
    count: number;
  }
  

const AdminDashCards : React.FC <CardsProps> = ({ text , icon: IconComponent , count }) => {
  return (
        <div className="bg-sky-700 rounded-lg border-2 shadow-md  h-28 w-1/5">
              <div className="px-6 py-4">
                <div className="flex items-center justify-center">
                  <div className="bg-gray-800 text-white rounded-full p-3   ">
                    <  IconComponent  />
                  </div>
                  <div className="ml-4">
                    <div className="font-bold text-md text-white font-serif">
                      { text }
                    </div>
                  </div>
                </div>
                <div className="text-gray-700 text-base mt-2">
                  <p className="text-3xl font-bold font-serif text-white text-wrap">
                    { count }
                  </p>
                </div>
              </div>
            </div>
  )
}

export default AdminDashCards