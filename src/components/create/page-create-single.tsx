import React from 'react';
import PageContainer from 'components/common/page-container';
import MintNftForm from 'components/create/forms/mint-nft-form';
import { Box } from '@chakra-ui/react';

const PageCreateSingle = () => (
  <PageContainer data-name="mint-page">
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box maxW="500px" w="100%" pb={10}>
        <MintNftForm />
      </Box>
    </Box>
  </PageContainer>
);

export default PageCreateSingle;
