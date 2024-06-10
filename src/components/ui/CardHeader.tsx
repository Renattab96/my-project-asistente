import React from 'react';

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => {
  return (
    <div className={`pb-2 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

export default CardHeader;
