import React, { useState } from 'react';
import { Box, Text, useColorMode, Link, Grid, GridItem } from '@chakra-ui/react';
import SubstrateNodeSelector from 'components/common/substrate-node-selector';
import FooterSocial from 'components/app/footer/footer-social';
import NextLink from 'next/link';
import { useTranslation } from 'next-i18next';
import { useScreenSize } from 'lib/hooks';

const Footer = () => {
  const { isSm } = useScreenSize();
  const { t } = useTranslation('common');
  const [showNodeSelection, setShowNodeSelection] = useState(false);
  const isDark = useColorMode().colorMode === 'dark';

  let easterEggCount = 0;
  const easterEggAction = () => {
    easterEggCount++;
    if (easterEggCount > 4) {
      setShowNodeSelection(true);
      easterEggCount = 0;
    }
  };

  return (
    <Box
      as="footer"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      flexWrap="wrap"
      flexDirection={['column', 'row']}
      h={['auto', '50px']}
      py={[3, 0]}
      px={4}
      fontFamily="mono"
      fontSize="sm"
      borderTopWidth="1px"
      borderTopStyle="solid"
      borderTopColor={isDark ? 'gray.300' : 'pink.400'}
      backgroundColor={isDark ? 'gray.800' : 'white'}
      data-name="footer">
      <Grid templateColumns="repeat(12, 1fr)" w="100%">
        {!isSm && (
          <GridItem colSpan={[5, 4]}>
            <Box onClick={easterEggAction} display="flex" alignItems="center">
              <Text fontSize="md" mr={1}>
                ©
              </Text>
              {t('footer-team')}, 2021. {showNodeSelection && <SubstrateNodeSelector />}
            </Box>
          </GridItem>
        )}
        <GridItem
          colSpan={[isSm ? 12 : 7, 4]}
          rowSpan={[1, 1]}
          display="flex"
          alignItems="center"
          justifyContent="center">
          <FooterSocial />
        </GridItem>
        <GridItem
          colSpan={[12, 4]}
          display="flex"
          justifyContent={isSm ? 'center' : ['flex-start', 'flex-end']}>
          <Box display="flex" alignItems="center" color="pink.400">
            <NextLink href="/terms-and-conditions" passHref>
              <Link>{t('footer-t&c')}</Link>
            </NextLink>
            <Box mx={1}>|</Box>
            <Link href="https://rmrk.app/#services" target="_blank">
              {t('footer-nft-link')}
            </Link>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Footer;
