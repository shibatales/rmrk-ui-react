import React, { useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Link,
} from '@chakra-ui/react';
import { useAccountsStore } from 'lib/accounts/store';
import { useConnectWeb3Account } from 'lib/hooks/use-connect-web3-accounts';
import dynamic from 'next/dynamic';
import { isWeb3Injected } from '@polkadot/extension-dapp';
import { useTranslation, Trans } from 'next-i18next';

const AccountSelection = dynamic(() => import('components/accounts/account-selection'), {
  ssr: false,
});

const ConnectAccountModal = () => {
  const { t } = useTranslation('common');
  const { initialise, accounts, enabled } = useConnectWeb3Account();
  const { modalOpened, toggleAccountSelectionModal } = useAccountsStore((state) => ({
    modalOpened: state.modalOpened,
    toggleAccountSelectionModal: state.toggleAccountSelectionModal,
  }));

  useEffect(() => {
    if (enabled) {
      initialise();
    }
  }, [enabled]);
  const onClose = () => {
    toggleAccountSelectionModal(false);
  };
  const hasAccounts = accounts && accounts.length > 0;

  return (
    <Modal isOpen={modalOpened} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('connect-wallet-modal-title')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <AccountSelection />
          {!enabled && isWeb3Injected && <Box>{t('connect-wallet-modal-no-extension')}</Box>}
          {!isWeb3Injected && (
            <Box>
              <Trans t={t} i18nKey="connect-wallet-modal-need-extension">
                You need to have a{' '}
                <Link
                  href="https://app.subsocial.network/2425/kusama-quick-wallet-setup-13794"
                  color="pink.500"
                  isExternal>
                  polkadot extension
                </Link>{' '}
                installed use this app
              </Trans>
            </Box>
          )}
          {enabled && isWeb3Injected && !hasAccounts && (
            <Box>{t('connect-wallet-modal-no-accounts')}</Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConnectAccountModal;
