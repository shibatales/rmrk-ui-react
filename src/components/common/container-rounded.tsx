import React, { FunctionComponent } from 'react';
import { Box, HTMLChakraProps, useColorMode } from '@chakra-ui/react';

interface IProps extends HTMLChakraProps<'div'> {}

const ContainerRounded: FunctionComponent<IProps> = ({ children, ...restProps }) => {
  const isDark = useColorMode().colorMode === 'dark';

  return (
    <Box
      data-name="container-rounded"
      backgroundColor={isDark ? 'gray.600' : 'gray.50'}
      borderRadius="3xl"
      {...restProps}>
      {children}
    </Box>
  );
};

export default ContainerRounded;
