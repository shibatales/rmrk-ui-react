import React from 'react';
import { Box } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import CardShell from 'components/create/card-shell';

const CreateCollectionCard = () => {
  return (
    <CardShell>
      <Box
        minHeight="360px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center">
        <Box fontSize="md" fontFamily="mono">
          Add new collection
        </Box>
        <Box
          mt={4}
          w="40px"
          h="40px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderWidth="1px"
          borderStyle="solid"
          borderColor="gray.800"
          borderRadius="100%">
          <AddIcon />
        </Box>
      </Box>
    </CardShell>
  );
};

export default CreateCollectionCard;
