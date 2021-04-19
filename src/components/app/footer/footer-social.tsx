import React from 'react';
import { Box, Link } from '@chakra-ui/react';
import { socialNetworkList } from 'lib/common/social-network-list';

const FooterSocial = () => (
  <Box
    data-name="footer-social"
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexWrap="wrap"
    fontSize={['2xl', 'xl']}>
    {socialNetworkList.map((item, i) => (
      <Link px={2} py={[1, 0]} isExternal href={item.href} key={`footer-social-item-${item.href}`}>
        {item.icon}
      </Link>
    ))}
  </Box>
);

export default FooterSocial;
