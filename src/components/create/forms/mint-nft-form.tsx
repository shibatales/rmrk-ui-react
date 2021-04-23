import React, { useState, useEffect } from 'react';
import { Box, Button, useToast } from '@chakra-ui/react';
import FormHeading from 'components/create/forms/form-heading';
import { useForm } from 'react-hook-form';
import Input from 'components/common/inputs/input';
import Textarea from 'components/common/inputs/textarea';
import { IMintFormField } from 'lib/types';
import Dropzone from 'components/common/dropzone';
import FormChooseCollection from 'components/create/forms/form-choose-collection';
import { useTranslation } from 'next-i18next';
import { useTransactionStatus } from 'lib/nft/transaction-status';

const MintNFTForm = () => {
  const { t } = useTranslation('page-create');
  const [formFile, setFormFile] = useState<File>();
  const transactionStatus = useTransactionStatus('mint-nft');
  const { register, handleSubmit, errors, formState } = useForm();
  const toast = useToast();

  useEffect(() => {
    const errorlist = Object.values(formState.errors);

    if (errorlist.length > 0) {
      toast({
        title: 'Error',
        description: errorlist[0].message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  }, [formState]);

  const formFieldList: IMintFormField[] = [
    // {
    //   name: 'collection',
    //   required: t('mint-nft-input-collection-required'),
    //   label: t('mint-nft-input-collection-label'),
    //   error: errors.collection,
    // },
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
    if (!formFile) {
      transactionStatus.warning('Please upload some file');
    }
    // const ipfsUrl = await pinMetadataFile(formFile)
    console.log(data);
  };

  return (
    <Box data-name="mint-nft-form">
      <Box mt={6} mb={10}>
        <FormHeading>Create single nft</FormHeading>
      </Box>
      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        id="mint-nft-form"
        name="mint-collection-form">
        <Box mb={4}>
          <Dropzone setFormFile={setFormFile} />
        </Box>
        <Box mb={4}>
          <FormChooseCollection register={register} />
        </Box>
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
        <Box mt={4}>
          <Textarea
            label={t('mint-nft-input-description-label')}
            name="description"
            ref={register}
          />
        </Box>
        <Box mt={6}>
          <Button type="submit" form="mint-nft-form" colorScheme="pink" variant="solid">
            {t('button-create')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MintNFTForm;
