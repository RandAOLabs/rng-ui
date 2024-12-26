import React from 'react';
import './OutlinedButton.css';

interface OutlinedButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

const OutlinedButton: React.FC<OutlinedButtonProps> = ({ 
  text, 
  onClick,
  className = ''
}) => {
  return (
    <button 
      className={`outlined-button ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default OutlinedButton;
