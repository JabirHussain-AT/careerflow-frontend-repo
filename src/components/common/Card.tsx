import { ReactNode } from 'react';

const Card = ({ children } : {children : ReactNode}) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-md">
      {children}
    </div>
  );
};

export default Card;
