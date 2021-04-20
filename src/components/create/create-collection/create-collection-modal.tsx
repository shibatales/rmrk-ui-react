import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import MintCollectionForm from 'components/create/forms/mint-collection-form';
import { useCreateStore } from 'lib/create/store';

const CreateCollectionModal = () => {
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
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <MintCollectionForm />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateCollectionModal;
