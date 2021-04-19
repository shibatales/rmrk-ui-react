import { IoLogoYoutube, IoMdMail } from 'react-icons/io';
import { FaDiscord, FaTelegramPlane, FaTwitter, FaBlog } from 'react-icons/fa';
import { ISociaItem } from 'lib/types';

export const socialNetworkList: ISociaItem[] = [
  {
    icon: <FaTelegramPlane />,
    href: 'https://t.me/kanaria_official',
  },
  {
    icon: <FaDiscord />,
    href: 'https://discord.gg/bV9kQbVC99',
  },
  {
    icon: <FaTwitter />,
    href: 'https://twitter.com/rmrkapp',
  },
  {
    icon: <IoMdMail />,
    href: 'https://news.nft.review',
  },
  {
    icon: <FaBlog />,
    href: 'https://app.subsocial.network/@rmrkapp',
  },
  {
    icon: <IoLogoYoutube />,
    href: 'https://www.youtube.com/channel/UCZ9dCwNm2aErxsYxDdm-AtQ',
  },
];
