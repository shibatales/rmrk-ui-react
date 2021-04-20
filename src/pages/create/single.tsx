import React from 'react';
import dynamic from 'next/dynamic';
import Page from 'components/common/page';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const PageCreateSingle = dynamic(() => import('components/create/page-create-single'), {
  ssr: false,
});

const CreateSingle = () => {
  const { t } = useTranslation('page-create');

  const title = t('page-title');

  return (
    <Page title={title}>
      <PageCreateSingle />
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'page-create'])),
    },
  };
};

export default CreateSingle;
