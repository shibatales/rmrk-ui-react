import React from 'react';
import { Box } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import CardShell from 'components/create/card-shell';

const CreateCollectionCard = () => {
  return (
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
  );
};

export default CreateCollectionCard;
