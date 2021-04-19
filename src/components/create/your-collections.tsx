import React from 'react';
import { Box, SimpleGrid, Container } from '@chakra-ui/react';
import CreateCollectionCard from 'components/create/create-collection-card';

const YourCollections = () => (
  <SimpleGrid mb={16} columns={[2, 2, 4]} spacing={[10, 10, 6]}>
    <CreateCollectionCard />
  </SimpleGrid>
);

export default YourCollections;
