import React, { useState, useEffect } from 'react';
import { Box, Button, IconButton, useToast } from '@chakra-ui/react';
import FormHeading from 'components/create/forms/form-heading';
import { useFieldArray, useForm, Controller, NestedValue } from 'react-hook-form';
import Input from 'components/common/inputs/input';
import Textarea from 'components/common/inputs/textarea';
import Dropzone from 'components/common/dropzone';
import FormChooseCollection from 'components/create/forms/form-choose-collection';
import { useTranslation } from 'next-i18next';
import { useTransactionStatus } from 'lib/nft/transaction-status';
import Label from 'components/common/inputs/label';
import { AddIcon } from '@chakra-ui/icons';

interface Attributes {
  key: string;
  value: string;
}

export interface NFTFormFields {
  name: string;
  description: string;
  attributes: NestedValue<Attributes[]>;
}

const MintNFTForm = () => {
  const { t } = useTranslation('page-create');
  const [formFile, setFormFile] = useState<File>();
  const transactionStatus = useTransactionStatus('mint-nft');
  const { register, handleSubmit, errors, formState, control } = useForm<NFTFormFields>({
    defaultValues: {
      attributes: [{ key: '', value: '' }],
    },
  });
  const { fields, append, remove } = useFieldArray<Attributes>({
    control,
    name: 'attributes',
  });
  const toast = useToast();

  useEffect(() => {
    const errorlist = Object.values(formState.errors);

    if (errorlist.length > 0) {
      toast({
        title: 'Error',
        description: errorlist?.[0]?.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  }, [formState]);

  const nameRequiredMessage = t('mint-nft-input-name-required');

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
        <Box mt={0}>
          <Input
            type="string"
            name="name"
            ref={register({ required: nameRequiredMessage })}
            label={t('mint-nft-input-name-label')}
            error={errors.name}
          />
        </Box>
        <Box mt={4}>
          <Textarea
            label={t('mint-nft-input-description-label')}
            name="description"
            ref={register}
          />
        </Box>
        <Box mt={4}>
          <Box mb={1}>
            <Label htmlFor="is-unlimited">{t('mint-nft-input-attributes-label')}</Label>
          </Box>
          {fields.map((item, index) => {
            return (
              <Box key={item.id} display="flex" mt={4}>
                <Box mr={2}>
                  <Input
                    type="string"
                    name={`attributes.${index}.key`}
                    ref={register({ required: nameRequiredMessage })}
                    placeholder="Color"
                  />
                </Box>

                <Box mr={2}>
                  <Input
                    type="string"
                    name={`attributes.${index}.value`}
                    ref={register({ required: nameRequiredMessage })}
                    placeholder="Red"
                  />
                </Box>
                {index === fields.length - 1 && (
                  <Box>
                    <IconButton
                      onClick={() => {
                        append({ key: '', value: '' });
                      }}
                      variant="outline"
                      aria-label="Add another attribute"
                      fontSize="14px"
                      isRound
                      icon={<AddIcon />}
                    />
                  </Box>
                )}
              </Box>
            );
          })}
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
