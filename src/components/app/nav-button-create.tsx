import React from 'react';
import { Link, Button } from '@chakra-ui/react';
import NextLink from 'next/link';

const ButtonCreate = () => (
  <NextLink href="/create" passHref>
    <Link
      _hover={{
        textDecoration: 'none',
      }}>
      <Button colorScheme="pink" size="sm">
        Create
      </Button>
    </Link>
  </NextLink>
);

export default ButtonCreate;
