import React, { ChangeEvent, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Switch } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import Input from 'components/common/inputs/input';
import { useTranslation } from 'next-i18next';
import Textarea from 'components/common/inputs/textarea';
import Dropzone from 'components/common/dropzone';
import { mintCollection } from 'lib/nft/mint-collection';
import { useTransactionStatus } from 'lib/nft/transaction-status';
import Label from 'components/common/inputs/label';

export interface CollectionFormFields {
  name: string;
  max: string;
  symbol: string;
  description: string;
}

const MintCollectionForm = () => {
  const [unlimited, setUnlimited] = useState(true);
  const { t } = useTranslation('page-create');
  const [formFile, setFormFile] = useState<File>();
  const { register, handleSubmit, errors, setValue } = useForm<CollectionFormFields>({
    defaultValues: { max: '0' },
  });
  const transactionStatus = useTransactionStatus('mint-collection');

  const onSubmit = (collectionFields: CollectionFormFields) => {
    mintCollection({ collectionFields, file: formFile, transactionStatus });
  };

  const symbolRequired = t('mint-collection-input-symbol-required');
  const nameRequired = t('mint-collection-input-name-required');
  const maxRequired = t('mint-collection-input-max-required');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUnlimited(event.target.checked);
    setValue('max', event.target.checked ? '0' : '1', { shouldValidate: true });
  };

  const submit = (event: React.SyntheticEvent) => {
    event?.stopPropagation();
    handleSubmit(onSubmit)(event);
  };

  return (
    <Box data-name="mint-collection-form">
      <Box mb={4}>
        <Dropzone setFormFile={setFormFile} imageOnly displayPreview />
      </Box>
      <Box as="form" onSubmit={submit} id="mint-collection-form">
        <Box mt={0}>
          <Input
            name="name"
            ref={register({ required: nameRequired })}
            label={t('mint-collection-input-name-label')}
            error={errors.name}
          />
        </Box>

        <Box mt={4}>
          <Box mb={1}>
            <Label htmlFor="is-unlimited">{t('mint-collection-max-label')}</Label>
          </Box>
          <FormControl display="flex" alignItems="center" mb={2}>
            <Switch id="is-unlimited" isChecked={unlimited} onChange={handleChange} />
            <Box ml={2}>
              <Label htmlFor="is-unlimited">{t('mint-collection-is-infinite-label')}</Label>
            </Box>
          </FormControl>

          <Box display={unlimited ? 'none' : 'block'}>
            <Input
              name="max"
              type="number"
              ref={register({ required: maxRequired })}
              label={t('mint-collection-input-max-label')}
              error={errors.max}
            />
          </Box>
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
          <Textarea
            label={t('mint-collection-input-description-label')}
            name="description"
            ref={register}
          />
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
