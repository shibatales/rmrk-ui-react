import React from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import CreateCollectionCard from 'components/create/create-collection/create-collection-card';
import Label from 'components/common/inputs/label';

interface IProps {}

const FormChooseCollection = ({}: IProps) => (
  <Box data-name="form-collections">
    <Box mb={2}>
      <Label>Choose collection</Label>
    </Box>
    <SimpleGrid columns={3} spacing={6}>
      <CreateCollectionCard />
    </SimpleGrid>
  </Box>
);

export default FormChooseCollection;
