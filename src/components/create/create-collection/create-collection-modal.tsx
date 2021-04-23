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
import { useTranslation } from 'next-i18next';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}
const CreateCollectionModal = ({ isOpen, onClose }: IProps) => {
  const { t } = useTranslation('page-create');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
