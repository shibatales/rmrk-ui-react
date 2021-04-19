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
        <Box>Add new collection</Box>
        <Box>
          <AddIcon />
        </Box>
      </Box>
    </CardShell>
  );
};

export default CreateCollectionCard;
