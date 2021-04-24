import React, { Fragment } from 'react';
import { Box, SimpleGrid, useRadioGroup } from '@chakra-ui/react';
import CreateCollectionCard from 'components/create/create-collection/create-collection-card';
import Label from 'components/common/inputs/label';
import RadioCard from 'components/common/inputs/radio-card';
import { UseFormMethods } from 'react-hook-form';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from 'lib/models/db';
import { useEncodedUserAddress } from 'lib/accounts/use-encoded-address';
import { Collection } from 'lib/models/Collection';

interface IProps {
  register: UseFormMethods['register'];
}

const collections: { label: string; src: string; value: string }[] = [
  {
    label: 'Collection 1',
    src: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png',
    value: '1',
  },
  {
    label: 'Collection 2',
    src:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc9m6wTQLJVsy8DPDft5Z38YDGMmiVGhd9sVcCX1wHWFRitMdK23SeEBLhwqO8YlI9MHk&usqp=CAU',
    value: '2',
  },
];

const FormChooseCollection = ({ register }: IProps) => {
  const encodeduserAddress = useEncodedUserAddress();
  const userCollections = useLiveQuery(
    () =>
      db.collections
        .where({ issuer: encodeduserAddress || '' })
        .reverse()
        .toArray(),
    [encodeduserAddress],
  );

  console.log('userCollections', userCollections);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'collection',
    defaultValue: '1',
    onChange: () => console.log('wow'),
  });

  const group = getRootProps();

  return (
    <Box data-name="form-collections">
      <Box mb={2}>
        <Label>Choose collection</Label>
      </Box>

      <SimpleGrid columns={3} spacing={6} {...group}>
        <CreateCollectionCard />

        {userCollections && (
          <>
            {userCollections.map((collection: Collection) => {
              // @ts-ignore - Chakra-ui inner types issue
              const radio = getRadioProps({ value: collection.id });

              return <RadioCard {...radio} collection={collection} ref={register} />;
            })}
          </>
        )}
      </SimpleGrid>
    </Box>
  );
};

export default FormChooseCollection;
