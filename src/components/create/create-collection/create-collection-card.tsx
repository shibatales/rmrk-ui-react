import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import ContainerRounded from 'components/common/container-rounded';
import CreateCollectionModal from 'components/create/create-collection/create-collection-modal';

const CreateCollectionCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Box onClick={onClick} cursor="pointer">
        <ContainerRounded
          px={4}
          py={6}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center">
          <Box
            mb={3}
            w="48px"
            h="48px"
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
        </ContainerRounded>
      </Box>
      <CreateCollectionModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default CreateCollectionCard;
