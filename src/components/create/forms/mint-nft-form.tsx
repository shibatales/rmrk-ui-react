import React, { useState, useEffect } from 'react';
import { Box, Button, SimpleGrid, useRadioGroup, useToast } from '@chakra-ui/react';
import FormHeading from 'components/create/forms/form-heading';
import { useForm } from 'react-hook-form';
import Input from 'components/common/inputs/input';
import Textarea from 'components/common/inputs/textarea';
import { IMintFormField } from 'lib/types';
import Dropzone from 'components/common/dropzone';
import FormChooseCollections from 'components/create/form-choose-collection';
import { useTranslation } from 'next-i18next';
import { useTransactionStatus } from 'lib/nft/transaction-status';
import Label from 'components/common/inputs/label';
import CreateCollectionCard from 'components/create/create-collection/create-collection-card';
import RadioCard from 'components/common/inputs/radio-card';

const MintCollectionForm = () => {
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

  const collections: { label: string; src: string; value: string | number }[] = [
    {
      label: 'Collection 1',
      src: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png',
      value: '1',
    },
    {
      label: 'Collection 2',
      src:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc9m6wTQLJVsy8DPDft5Z38YDGMmiVGhd9sVcCX1wHWFRitMdK23SeEBLhwqO8YlI9MHk&usqp=CAU',
      value: '2',
    },
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'collection',
    defaultValue: '1',
    onChange: () => console.log('wow'),
  });

  const onSubmit = (data: any) => {
    if (!formFile) {
      transactionStatus.warning('Please upload some file');
    }
    // const ipfsUrl = await pinMetadataFile(formFile)
    console.log(data);
  };

  const group = getRootProps();

  return (
    <Box data-name="mint-nft-form">
      <Box mt={6} mb={10}>
        <FormHeading>Create single nft</FormHeading>
      </Box>
      <Box as="form" onSubmit={handleSubmit(onSubmit)} id="mint-nft-form">
        <Box mb={4}>
          <Dropzone setFormFile={setFormFile} />
        </Box>
        <Box mb={4}>
          <Box mb={2}>
            <Label>Choose collection</Label>
          </Box>
          <SimpleGrid columns={3} spacing={6} {...group}>
            <CreateCollectionCard />
            {collections.map(({ value, label, src }) => {
              const radio = getRadioProps({ value });

              return <RadioCard {...radio} key={value} label={label} img={src} ref={register} />;
            })}
          </SimpleGrid>
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

export default MintCollectionForm;
