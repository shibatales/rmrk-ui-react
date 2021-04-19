import React from 'react';
import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useAccountsStore } from 'lib/accounts/store';
import RampKsmModalForm from 'components/accounts/ramp-ksm-modal/ramp-ksm-modal-form';
import { useTranslation } from 'next-i18next';

const RampKSMModal = () => {
  const { t } = useTranslation('common');

  const { rampModalOpened, toggleRampModal } = useAccountsStore((state) => ({
    rampModalOpened: state.rampModalOpened,
    toggleRampModal: state.toggleRampModal,
  }));

  const onClose = () => {
    toggleRampModal(false);
  };

  return (
    <Modal isOpen={rampModalOpened} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent backgroundColor="transparent">
        <ModalBody>
          <Box display="flex" justifyContent="center">
            <Box backgroundColor="white" borderRadius="10px" pb={4} position="relative">
              <ModalCloseButton color="gray.800" />
              <ModalHeader color="gray.800">{t('ramp-modal-heading')}</ModalHeader>
              <Box py={[8, 0]}>
                <RampKsmModalForm />
              </Box>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RampKSMModal;
