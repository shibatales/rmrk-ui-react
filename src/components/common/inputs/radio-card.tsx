import React, { forwardRef, useEffect, useState } from 'react';
import { Box, useRadio, RadioProps, Avatar } from '@chakra-ui/react';
import ContainerRounded from 'components/common/container-rounded';
import { Collection } from 'lib/models/Collection';
import { CollectionMetadata } from 'rmrk-tools/dist/rmrk1.0.0/classes/collection';
import { fetchIpfsMetadata } from 'lib/utils/ipfs/utils';

interface IProps extends RadioProps {
  collection: Collection;
}

const RadioCard = forwardRef<HTMLInputElement, IProps>((props, ref) => {
  const { collection } = props;
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  const [metadata, setMetadata] = useState<CollectionMetadata | null>(null);

  useEffect(() => {
    const getImg = async () => {
      const response = await fetchIpfsMetadata(collection?.metadata);
      setMetadata(response);
    };

    getImg();
  }, [collection]);

  return (
    <Box as="label" data-name="radio-card" display="flex">
      <input {...input} ref={ref} />
      <ContainerRounded
        {...checkbox}
        flexGrow={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        borderRadius="3xl"
        boxShadow="md"
        backgroundColor="gray.50"
        _checked={{
          borderColor: 'pink.400',
          borderWidth: '2px',
        }}
        px={4}
        py={6}>
        {metadata?.image && (
          <Avatar
            size="md"
            name={collection.name}
            src={metadata.image}
            borderRadius="100%"
            mb={3}
          />
        )}
        <Box fontSize="sm" fontFamily="mono" fontWeight="semibold">
          {collection.name}
        </Box>
      </ContainerRounded>
    </Box>
  );
});

export default RadioCard;
