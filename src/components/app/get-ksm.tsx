import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useAccountsStore } from 'lib/accounts/store';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from 'lib/models/db';
import { GiEgyptianBird } from 'react-icons/gi';
import { useScreenSize } from 'lib/hooks';
import { useTranslation } from 'next-i18next';

const GetKSMButton = () => {
  const { t } = useTranslation('common');
  const { isSm } = useScreenSize();

  const { toggleRampModal } = useAccountsStore((state) => ({
    toggleRampModal: state.toggleRampModal,
  }));
  const account = useLiveQuery(() => db.account.get(0));

  const openRampModal = () => {
    toggleRampModal(true);
  };

  // available only on desktop
  return account?.web3Account && !isSm ? (
    <Box data-name="ramp-button-wrap">
      <Button
        colorScheme={'green'}
        size="xs"
        onClick={openRampModal}
        rightIcon={<GiEgyptianBird />}>
        {t('button-get-ksm')}
      </Button>
    </Box>
  ) : null;
};

export default GetKSMButton;
