interface SocialLink {
  url: string;
  icon: 'FaXTwitter' | 'FaGithub' | 'FaYoutube';
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    url: 'https://x.com/RandAOToken',
    icon: 'FaXTwitter'
  },
  {
    url: 'https://github.com/RandAOLabs',
    icon: 'FaGithub'
  },
  {
    url: 'https://www.youtube.com/channel/UCNtMrxVkQqCx_Dhj2SN_4BQ',
    icon: 'FaYoutube'
  }
];
