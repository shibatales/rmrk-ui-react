import React from 'react';
import { Box } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import CardShell from 'components/create/card-shell';
import { useCreateStore } from 'lib/create/store';
import CreateCollectionModal from 'components/create/create-collection/create-collection-modal';

const CreateCollectionCard = () => {
  const { setIsCreateCollectionModalOpen } = useCreateStore((state) => ({
    setIsCreateCollectionModalOpen: state.setIsCreateCollectionModalOpen,
  }));

  const onClick = () => {
    setIsCreateCollectionModalOpen(true);
  };

  return (
    <>
      <Box as="button" onClick={onClick}>
        <CardShell>
          <Box
            py={2}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center">
            <Box
              mb={3}
              w="40px"
              h="40px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderWidth="1px"
              borderStyle="solid"
              borderColor="gray.800"
              borderRadius="100%"
              fontSize="sm">
              <AddIcon />
            </Box>
            <Box fontSize="sm" fontFamily="mono" fontWeight="semibold">
              Create collection
            </Box>
          </Box>
        </CardShell>
      </Box>
      <CreateCollectionModal />
    </>
  );
};

export default CreateCollectionCard;
