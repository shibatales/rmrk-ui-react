import React, { useCallback } from 'react';
import { Box, Button, useColorMode } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import Label from 'components/common/inputs/label';
import { useTranslation } from 'next-i18next';

interface IProps {
  setFormFile: (file: File) => void;
  imageOnly?: boolean;
}

const Dropzone = ({ setFormFile, imageOnly }: IProps) => {
  const { t } = useTranslation('common');
  const isDark = useColorMode().colorMode === 'dark';
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFormFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: imageOnly ? 'image/*' : undefined,
    onDrop,
    maxFiles: 1,
    maxSize: 10485760, // 10Mb
  });

  return (
    <Box data-name="dropzone">
      <Box mb={2}>
        <Label>{t(imageOnly ? 'dropzone-label-image' : 'dropzone-label-file')}</Label>
      </Box>
      <Box
        {...getRootProps()}
        w="100%"
        p={10}
        display="flex"
        borderWidth="1px"
        borderStyle="dashed"
        borderColor={isDark ? 'white' : 'gray.500'}
        borderRadius="3xl">
        <input {...getInputProps()} />
        <Box
          flexGrow={1}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center">
          <Box fontFamily="mono" fontSize="sm">
            {isDragActive ? (
              <Box>
                {t('dropzone-title-drop-files', { count: 1, type: imageOnly ? 'image' : 'file' })}
              </Box>
            ) : (
              <Box>
                {t('dropzone-title-drag-files', { count: 1, type: imageOnly ? 'image' : 'file' })}
              </Box>
            )}
          </Box>
          <Button mt={10}>
            {t('dropzone-button-choose-file', { type: imageOnly ? 'image' : 'file' })}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Dropzone;
