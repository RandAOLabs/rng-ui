import React from 'react';
import './Announcement.css';

interface AnnouncementProps {
  message: string;
  showIcon?: boolean;
}

const Announcement: React.FC<AnnouncementProps> = ({ message, showIcon = true }) => {
  return (
    <div className="announcement">
      <p>{showIcon ? '🚧 ' : ''}{message}{showIcon ? ' 🚧' : ''}</p>
    </div>
  );
};

export default Announcement;
