import React, { forwardRef } from 'react';
import { Box, useRadio, RadioProps, Avatar } from '@chakra-ui/react';
import ContainerRounded from 'components/common/container-rounded';

interface IProps extends RadioProps {
  img?: string;
  label: string;
}

const RadioCard = forwardRef<HTMLInputElement, IProps>((props, ref) => {
  const { img, label } = props;
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getCheckboxProps();

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
        {img && <Avatar size="md" name={label} src={img} borderRadius="100%" mb={3} />}
        <Box fontSize="sm" fontFamily="mono" fontWeight="semibold">
          {label}
        </Box>
      </ContainerRounded>
    </Box>
  );
});

export default RadioCard;
