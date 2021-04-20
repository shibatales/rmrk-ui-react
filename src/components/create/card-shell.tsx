import React, { FunctionComponent } from 'react';
import { Box, useColorMode } from '@chakra-ui/react';

const CardShell: FunctionComponent = ({ children }) => {
  const isDark = useColorMode().colorMode === 'dark';
  return (
    <Box
      data-name="collectible-card-shell"
      p={4}
      w="100%"
      position="relative"
      borderWidth="1px"
      borderStyle="solid"
      borderColor={isDark ? 'gray.700' : 'gray:100'}
      boxShadow="0 4px 8px 0 rgba(0,0,0,0.2)"
      backgroundColor={isDark ? 'gray.600' : 'gray.50'}
      borderRadius="20px">
      {children}
    </Box>
  );
};

export default CardShell;
