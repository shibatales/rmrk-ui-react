import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import Input from 'components/common/inputs/input';
import { IMintFormField } from 'lib/types';
import { useTranslation } from 'next-i18next';

const MintCollectionForm = () => {
  const { t } = useTranslation('page-create');
  const { register, handleSubmit, errors } = useForm();

  const formFieldList: IMintFormField[] = [
    {
      name: 'name',
      required: t('mint-collection-input-name-required'),
      label: t('mint-collection-input-name-label'),
      error: errors.name,
    },
    {
      type: 'number',
      name: 'max',
      required: t('mint-collection-input-max-required'),
      label: t('mint-collection-input-max-label'),
      error: errors.max,
    },
    {
      name: 'issuer',
      required: t('mint-collection-input-issuer-required'),
      label: t('mint-collection-input-issuer-label'),
      error: errors.issuer,
    },
    {
      name: 'symbol',
      required: t('mint-collection-input-symbol-required'),
      label: t('mint-collection-input-symbol-label'),
      error: errors.symbol,
    },
    {
      name: 'id',
      label: t('mint-collection-input-id-label'),
    },
    {
      name: 'metadata',
      required: t('mint-collection-input-metadata-required'),
      label: t('mint-collection-input-metadata-label'),
      error: errors.metadata,
    },
  ];

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Box data-name="mint-collection-form">
      <Box as="form" onSubmit={handleSubmit(onSubmit)} id="mint-collection-form">
        {formFieldList.map((item, i) => (
          <Box mt={i === 0 ? undefined : 4} key={`mint-collection-form-field-${item.name}`}>
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
          <Button type="submit" form="mint-collection-form" colorScheme="pink" variant="solid">
            Turn into Remark
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MintCollectionForm;
