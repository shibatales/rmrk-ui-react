import React, { ChangeEvent } from 'react';
import { Select } from '@chakra-ui/react';
import { WS_PROVIDER_URLS } from 'lib/accounts/constants';
import { db } from 'lib/models/db';
import { useSubstrateProviderUrl } from 'lib/hooks/use-substrate-provider-url';

const SubstrateNodeSelector = () => {
  const wsProviderUrl = useSubstrateProviderUrl();
  const changeWsProviderUrl = async (event: ChangeEvent<HTMLSelectElement>) => {
    try {
      const wsProviderUrl = event.target.value || '';
      await db.substrate.update(0, { wsProviderUrl });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Select
      placeholder="Select Substrate node provider url"
      onChange={changeWsProviderUrl}
      value={wsProviderUrl}>
      {Object.values(WS_PROVIDER_URLS).map((providerUrl) => (
        <option value={providerUrl} key={providerUrl}>
          {providerUrl}
        </option>
      ))}
    </Select>
  );
};

export default SubstrateNodeSelector;
