import React from 'react';
import { Box, useColorMode } from '@chakra-ui/react';
import DarkModeSwitch from 'components/common/dark-mode-switch';
import SvgRmrkApp from 'components/common/icons/svg-rmrk-app';
import TopNavMenu from 'components/app/top-nav-menu';
import ButtonCreate from 'components/app/nav-button-create';
import dynamic from 'next/dynamic';

const AccountSwitch = dynamic(() => import('components/app/account-switch'), {
  ssr: false,
});

const ConnectAccountModal = dynamic(() => import('components/accounts/connect-account-modal'), {
  ssr: false,
});

const TopNav = () => {
  const isDark = useColorMode().colorMode === 'dark';

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px={4}
      h={70}
      borderBottomWidth="1px"
      borderBottomStyle="solid"
      borderBottomColor={isDark ? 'gray.300' : 'pink.400'}
      backgroundColor={isDark ? 'gray.800' : 'white'}
      transition="background-color ease 0.2s">
      <Box w={100}>
        <SvgRmrkApp />
      </Box>
      <Box display="flex" alignItems="center">
        <Box mr={6}>
          <TopNavMenu />
        </Box>
        <Box pr={4}>
          <ButtonCreate />
        </Box>

        {/*<Box pr={4}>*/}
        {/*  <GetKSMButton />*/}
        {/*</Box>*/}
        <Box pr={4}>
          <AccountSwitch />
        </Box>
        {/*<Box pr={5}>*/}
        {/*  <LanguageSwitch />*/}
        {/*</Box>*/}
        <DarkModeSwitch />
        <ConnectAccountModal />
      </Box>
    </Box>
  );
};

export default TopNav;
