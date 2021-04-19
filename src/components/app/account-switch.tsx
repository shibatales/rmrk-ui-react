import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useAccountsStore } from 'lib/accounts/store';
import { useScreenSize } from 'lib/hooks';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from 'lib/models/db';
import { SettingsIcon } from '@chakra-ui/icons';
import { useTranslation } from 'next-i18next';

const AccountSwitch = () => {
  const { t } = useTranslation('common');
  const { toggleAccountSelectionModal } = useAccountsStore((state) => ({
    toggleAccountSelectionModal: state.toggleAccountSelectionModal,
  }));
  const { isMd } = useScreenSize();
  const account = useLiveQuery(() => db.account.get(0));

  const openAccountsModal = () => {
    toggleAccountSelectionModal(true);
  };

  const accountCopy = account?.web3Account?.meta?.name || account?.web3Account?.address;
  const walletCopy = t(isMd ? 'button-wallet' : 'button-connect-wallet');

  return (
    <Box data-name="account-switch">
      <Button
        colorScheme={'pink'}
        size="sm"
        onClick={openAccountsModal}
        rightIcon={<SettingsIcon />}>
        {account?.web3Account ? accountCopy : walletCopy}
      </Button>
    </Box>
  );
};

export default AccountSwitch;
