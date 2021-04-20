import React, { useCallback } from 'react';
import { Box, useColorMode } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';

const Dropzone = () => {
  const isDark = useColorMode().colorMode === 'dark';
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box
      {...getRootProps()}
      w="100%"
      h="100px"
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
        {isDragActive ? (
          <Box>Drop the files here ...</Box>
        ) : (
          <Box>Drag 'n' drop some files here, or click to select files</Box>
        )}
      </Box>
    </Box>
  );
};

export default Dropzone;
