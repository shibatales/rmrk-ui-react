import React, { forwardRef } from 'react';
import { Box, Input as InputChakra } from '@chakra-ui/react';
import Label from './label';
import Error from './error';
import { FieldError } from 'react-hook-form';

interface IProps {
  id?: string;
  label?: string;
  type?: string;
  name: string;
  error?: FieldError;
  defaultValue?: string;
  placeholder?: string;
}

const Input = forwardRef<HTMLInputElement, IProps>(
  ({ defaultValue, placeholder, id, label, type, name, error }, ref) => (
    <Box data-name="input">
      {label && (
        <Box mb={1}>
          <Label htmlFor={id}>{label}</Label>
        </Box>
      )}
      <InputChakra
        type={type}
        name={name}
        id={id}
        ref={ref}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
      {error && (
        <Box mt={1}>
          <Error>{error.message}</Error>
        </Box>
      )}
    </Box>
  ),
);

export default Input;
