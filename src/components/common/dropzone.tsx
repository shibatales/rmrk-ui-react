import React, {useCallback, useState} from 'react';
import {Box, Button, useColorMode, Image} from '@chakra-ui/react';
import {FileError, FileRejection, useDropzone} from 'react-dropzone';
import Label from 'components/common/inputs/label';
import {useTranslation} from 'next-i18next';

interface IProps {
  setFormFile: (file: File) => void;
  imageOnly?: boolean;
  displayPreview?: boolean;
}

type PreviewFile = File & { preview: string };

const Dropzone = ({setFormFile, imageOnly, displayPreview}: IProps) => {
  const [previews, setPreviews] = useState<PreviewFile[]>([]);
  const [error, setError] = useState<FileError | null>(null);
  const {t} = useTranslation('common');
  const isDark = useColorMode().colorMode === 'dark';
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    setFormFile(acceptedFiles[0]);
    setPreviews(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ),
    );
  }, []);

  const onDropAccepted = useCallback(() => {
    setError(null);
  }, []);

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    setError(fileRejections[0].errors?.[0]);
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: imageOnly ? 'image/*' : undefined,
    onDrop,
    onDropAccepted,
    onDropRejected,
    maxFiles: 1,
    maxSize: 20971520, // 20Mb
  });

  const thumbs = previews.map((file) => (
    <Box key={file.name} mt={2} display="flex">
      <Box>
        <Image src={file.preview} width="100%"/>
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
          {error && (
            <Box color="red" fontWeight={600} mb={2}>
              {error.code === 'file-too-large' ? t('file-size-limit') : error.message}
            </Box>
          )}
          {displayPreview && thumbs && thumbs.length > 0 ? (
            <Box
              _hover={{
                opacity: 0.7,
                cursor: 'pointer',
              }}>
              {thumbs}
            </Box>
          ) : (
            <>
              <Box fontFamily="mono" fontSize="sm">
                {isDragActive ? (
                  <Box>
                    {t('dropzone-title-drop-files', {
                      count: 1,
                      type: imageOnly ? 'image' : 'file',
                    })}
                  </Box>
                ) : (
                  <Box>
                    {t('dropzone-title-drag-files', {
                      count: 1,
                      type: imageOnly ? 'image' : 'file',
                    })}
                  </Box>
                )}
              </Box>
              <Button m={10}>
                {t('dropzone-button-choose-file', {type: imageOnly ? 'image' : 'file'})}
              </Button>
              <Box fontFamily="mono" fontSize="sm"><small>{t('dropzone-file-formats')}</small></Box>
              <Box fontFamily="mono" fontSize="sm"><small>({t('dropzone-file-size-limit')})</small></Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Dropzone;
