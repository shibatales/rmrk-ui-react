import React, { useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import Input from 'components/common/inputs/input';
import { useTranslation } from 'next-i18next';
import Textarea from 'components/common/inputs/textarea';
import Dropzone from 'components/common/dropzone';
import { mintCollection } from 'lib/nft/mint-collection';
import { useTransactionStatus } from 'lib/nft/transaction-status';

export interface CollectionFormFields {
  name: string;
  max: string;
  symbol: string;
  description: string;
}

const MintCollectionForm = () => {
  const { t } = useTranslation('page-create');
  const [formFile, setFormFile] = useState<File>();
  const { register, handleSubmit, errors } = useForm();
  const transactionStatus = useTransactionStatus('mint-collection');

  const onSubmit = (collectionFields: CollectionFormFields) => {
    mintCollection({ collectionFields, file: formFile, transactionStatus });
  };

  const symbolRequired = t('mint-collection-input-symbol-required');
  const nameRequired = t('mint-collection-input-name-required');
  const maxRequired = t('mint-collection-input-max-required');

  return (
    <Box data-name="mint-collection-form">
      <Box mb={4}>
        <Dropzone setFormFile={setFormFile} imageOnly displayPreview />
      </Box>
      <Box as="form" onSubmit={handleSubmit(onSubmit)} id="mint-collection-form">
        <Box mt={0}>
          <Input
            name="name"
            ref={register({ required: nameRequired })}
            label={t('mint-collection-input-name-label')}
            error={errors.name}
          />
        </Box>
        <Box mt={4}>
          <Input
            name="max"
            ref={register({ required: maxRequired })}
            label={t('mint-collection-input-max-label')}
            error={errors.max}
          />
        </Box>
        <Box mt={4}>
          <Input
            name="symbol"
            ref={register({ required: symbolRequired })}
            label={t('mint-collection-input-symbol-label')}
            error={errors.symbol}
          />
        </Box>
        <Box mt={4}>
          <Textarea label="Description" name="description" ref={register} />
        </Box>
        <Box mt={6}>
          <Button type="submit" form="mint-collection-form" colorScheme="pink" variant="solid">
            {t('button-create')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MintCollectionForm;
