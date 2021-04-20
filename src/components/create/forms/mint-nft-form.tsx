import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import FormHeading from 'components/create/forms/form-heading';
import { useForm } from 'react-hook-form';
import Input from 'components/common/inputs/input';
import { IMintFormField } from 'lib/types';
import Dropzone from 'components/common/dropzone';
import FormChooseCollections from 'components/create/form-choose-collection';
import { useTranslation } from 'next-i18next';

const MintCollectionForm = () => {
  const { t } = useTranslation('page-create');

  const { register, handleSubmit, errors } = useForm();

  const formFieldList: IMintFormField[] = [
    {
      name: 'collection',
      required: t('mint-nft-input-collection-required'),
      label: t('mint-nft-input-collection-label'),
      error: errors.collection,
    },
    {
      name: 'name',
      required: t('mint-nft-input-name-required'),
      label: t('mint-nft-input-name-label'),
      error: errors.name,
    },
    {
      name: 'instance',
      required: 'Please enter instance',
      label: 'Instance*',
      error: errors.instance,
    },
    {
      type: 'number',
      name: 'transferable',
      label: t('mint-nft-input-transferable-label'),
    },
    {
      name: 'serialNumber',
      label: t('mint-nft-input-serialNumber-label'),
    },
    {
      name: 'metadata',
      required: t('mint-nft-input-metadata-required'),
      label: t('mint-nft-input-metadata-label'),
      error: errors.metadata,
    },
  ];

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Box data-name="mint-nft-form">
      <Box mt={6} mb={10}>
        <FormHeading>Create single nft</FormHeading>
      </Box>
      <Box mb={4}>
        <Dropzone />
      </Box>
      <Box mb={4}>
        <FormChooseCollections />
      </Box>
      <Box as="form" onSubmit={handleSubmit(onSubmit)} id="mint-nft-form">
        {formFieldList.map((item, i) => (
          <Box mt={i === 0 ? undefined : 4} key={`mint-nft-form-field-${item.name}`}>
            <Input
              type={item.type}
              name={item.name}
              ref={item.required ? register({ required: item.required }) : register}
              label={item.label}
              error={item.error}
            />
          </Box>
        ))}
        <Box mt={6}>
          <Button type="submit" form="mint-nft-form" colorScheme="pink" variant="solid">
            {t('button-create')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MintCollectionForm;
