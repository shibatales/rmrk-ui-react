import React from 'react';
import dynamic from 'next/dynamic';
import Page from 'components/common/page';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const PageHome = dynamic(() => import('components/home/page-home'), { ssr: false });

const Index = () => {
  const title = 'RMRK Marketplace';

  return (
    <Page title={title}>
      <PageHome />
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

export default Index;
