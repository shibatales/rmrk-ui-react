import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import MintCollectionForm from 'components/create/forms/mint-collection-form';
import { useCreateStore } from 'lib/create/store';
import { useTranslation } from 'next-i18next';

const CreateCollectionModal = () => {
  const { t } = useTranslation('page-create');
  const { isCreateCollectionModalOpen, setIsCreateCollectionModalOpen } = useCreateStore(
    (state) => ({
      isCreateCollectionModalOpen: state.isCreateCollectionModalOpen,
      setIsCreateCollectionModalOpen: state.setIsCreateCollectionModalOpen,
    }),
  );

  const onClose = () => {
    setIsCreateCollectionModalOpen(false);
  };

  return (
    <Modal isOpen={isCreateCollectionModalOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('mint-collection-modal-title')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <MintCollectionForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateCollectionModal;
