import React, { ChangeEvent, useEffect } from 'react';
import { useAccountsStore } from 'lib/accounts/store';
import { useConnectWeb3Account } from 'lib/hooks/use-connect-web3-accounts';
import { db } from 'lib/models/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { Select } from '@chakra-ui/react';
import { w3Store } from 'lib/w3/store';
import { encodeAddress } from '@polkadot/util-crypto';
import { useTranslation } from 'next-i18next';

const AccountSelection = () => {
  const { t } = useTranslation('common');
  const { initialise, accounts } = useConnectWeb3Account();
  const account = useLiveQuery(() => db.account.get(0));
  const { systemProperties } = w3Store((state) => ({
    systemProperties: state.systemProperties,
  }));

  const { toggleAccountSelectionModal } = useAccountsStore((state) => ({
    toggleAccountSelectionModal: state.toggleAccountSelectionModal,
  }));

  useEffect(() => {
    initialise();
  }, []);

  const hasAccounts = accounts && accounts.length > 0;

  if (!hasAccounts) {
    return null;
  }

  const selectAccount = (event: ChangeEvent<HTMLSelectElement>) => {
    const accountId = event.target.value || '';
    if (accounts) {
      const account = accounts.find((account) => account.address === accountId);
      db.account.update(0, { web3Account: account });
      toggleAccountSelectionModal(false);
    } else {
      db.account.update(0, { web3Account: null });
    }
  };

  return accounts ? (
    <Select value={account?.web3Account?.address} onChange={selectAccount}>
      <option disabled selected hidden>
        {t('connect-wallet-modal-select-account')}
      </option>
      {accounts.map((account) => (
        <option value={account.address} key={account.address}>
          {account.meta.name} - {encodeAddress(account.address, systemProperties.ss58Format)}
        </option>
      ))}
    </Select>
  ) : null;
};

export default AccountSelection;
