import React, { FunctionComponent } from 'react';
import { useColorMode } from '@chakra-ui/react';
import ContainerRounded from 'components/common/container-rounded';

const CardShell: FunctionComponent = ({ children }) => {
  const isDark = useColorMode().colorMode === 'dark';

  return (
    <ContainerRounded
      data-name="collectible-card-shell"
      p={4}
      w="100%"
      position="relative"
      borderWidth="1px"
      borderStyle="solid"
      borderColor={isDark ? 'gray.700' : 'gray:100'}
      boxShadow="0 4px 8px 0 rgba(0,0,0,0.2)">
      {children}
    </ContainerRounded>
  );
};

export default CardShell;
