import React from 'react';
import PageContainer from 'components/common/page-container';
import YourCollections from 'components/create/your-collections';
import MintNftForm from 'components/create/forms/mint-nft-form';

const PageCreateSingle = () => (
  <PageContainer data-name="mint-page">
    <MintNftForm />
    <YourCollections />
  </PageContainer>
);

export default PageCreateSingle;
