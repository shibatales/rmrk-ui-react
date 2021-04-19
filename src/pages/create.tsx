import React from 'react';
import dynamic from 'next/dynamic';
import Page from 'components/common/page';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const MintPage = dynamic(() => import('components/create/create-page'), { ssr: false });

const Create = () => {
  const title = 'Mint';

  return (
    <Page title={title}>
      <MintPage />
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Create;
