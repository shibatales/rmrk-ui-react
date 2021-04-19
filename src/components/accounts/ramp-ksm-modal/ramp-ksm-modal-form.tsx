import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk';
import { useEncodedUserAddress } from 'lib/accounts/use-encoded-address';
import { useScreenSize } from 'lib/hooks';

const RampKsmModalForm = () => {
  const { isSm } = useScreenSize();
  const containerRef = useRef(null);
  const { current } = containerRef;
  const [initialised, setRampInitialised] = useState<boolean>(false);
  const userAddressEncoded = useEncodedUserAddress();

  useEffect(() => {
    if (userAddressEncoded && current) {
      if (current)
        setTimeout(() => {
          setRampInitialised(true);
        }, 1000);
    }
  }, [userAddressEncoded, current]);

  useEffect(() => {
    if (initialised) {
      new RampInstantSDK({
        hostAppName: 'Kanaria',
        hostLogoUrl:
          'https://gateway.pinata.cloud/ipfs/QmWS1jXv8B8smQotmtpHkkYkvUma4dmTVGDYAtCuEtNMR3',
        swapAsset: 'KSM',
        userAddress: userAddressEncoded,
        variant: isSm ? 'embedded-mobile' : 'embedded-desktop',
        containerNode: current!,
        hostApiKey: '7ejmraepjrwo59c93yutbcskpbo2httq7qtk3r2b',
      }).show();
    }
  }, [initialised]);

  return (
    <Box
      minW={['375px', '895px']}
      minH={['667px', '590px']}
      id="ramp-container"
      ref={containerRef}
    />
  );
};

export default RampKsmModalForm;
