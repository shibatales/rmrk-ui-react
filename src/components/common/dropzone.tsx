import React, { useCallback, useState } from 'react';
import { Box, Button, useColorMode, Image } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import Label from 'components/common/inputs/label';
import { useTranslation } from 'next-i18next';

interface IProps {
  setFormFile: (file: File) => void;
  imageOnly?: boolean;
  displayPreview?: boolean;
}

type PreviewFile = File & { preview: string };

const Dropzone = ({ setFormFile, imageOnly, displayPreview }: IProps) => {
  const [previews, setPreviews] = useState<PreviewFile[]>([]);
  const { t } = useTranslation('common');
  const isDark = useColorMode().colorMode === 'dark';
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFormFile(acceptedFiles[0]);
    setPreviews(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ),
    );
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: imageOnly ? 'image/*' : undefined,
    onDrop,
    maxFiles: 1,
    maxSize: 10485760, // 10Mb
  });

  const thumbs = previews.map((file) => (
    <Box key={file.name}>
      <Box>
        <Image src={file.preview} />
      </Box>
    </Box>
  ));

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
      {displayPreview && <Box>{thumbs}</Box>}
    </Box>
  );
};

export default Dropzone;
