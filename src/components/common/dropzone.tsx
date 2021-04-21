import React, { useCallback } from 'react';
import { Box, Button, useColorMode } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import Label from 'components/common/inputs/label';
import { useTranslation } from 'next-i18next';

interface IProps {
  setFormFile: (file: File) => void;
}

const Dropzone = ({ setFormFile }: IProps) => {
  const { t } = useTranslation('common');
  const isDark = useColorMode().colorMode === 'dark';
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFormFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 10485760, // 10Mb
  });

  return (
    <Box data-name="dropzone">
      <Box mb={2}>
        <Label>{t('dropzone-label')}</Label>
      </Box>
      <Box
        {...getRootProps()}
        w="100%"
        p={10}
        display="flex"
        borderWidth="1px"
        borderStyle="dashed"
        borderColor={isDark ? 'white' : 'gray.500'}
        borderRadius="20px">
        <input {...getInputProps()} />
        <Box
          flexGrow={1}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center">
          <Box fontFamily="mono" fontSize="sm">
            {isDragActive ? (
              <Box>{t('dropzone-title-drop-files')}</Box>
            ) : (
              <Box>{t('dropzone-title-drag-files')}</Box>
            )}
          </Box>
          <Button mt={10}>{t('dropzone-button-choose-file')}</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Dropzone;
