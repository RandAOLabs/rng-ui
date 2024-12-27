import React from 'react';
import { FaGithub, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import './SocialLinks.css';

export const SocialLinks: React.FC = () => {
  return (
    <div className="social-links">
      <a 
        href="https://x.com/RandAOToken" 
        target="_blank" 
        rel="noopener noreferrer"
        className="social-link"
      >
        <FaXTwitter size={24} />
      </a>
      <a 
        href="https://github.com/RandAOLabs" 
        target="_blank" 
        rel="noopener noreferrer"
        className="social-link"
      >
        <FaGithub size={24} />
      </a>
      <a 
        href="https://www.youtube.com/channel/UCNtMrxVkQqCx_Dhj2SN_4BQ" 
        target="_blank" 
        rel="noopener noreferrer"
        className="social-link"
      >
        <FaYoutube size={24} />
      </a>
    </div>
  );
};
