import { consolidatedCollectionToInstance } from 'rmrk-tools/dist/tools/consolidator/utils';
import { Collection } from 'rmrk-tools';
import { decodeAddress } from '@polkadot/keyring';
import { db } from 'lib/models/db';
import { u8aToHex } from '@polkadot/util';
import { CollectionFormFields } from 'components/create/forms/mint-collection-form';
import { pinMetadataFile } from 'lib/nft/pin-metadata';
import { useTransactionStatus } from 'lib/nft/transaction-status';
import { polkadotApi } from 'lib/app/get-polkadot-api';
import { useAccountsStore } from 'lib/accounts/store';
import { getEncodedAddress } from 'lib/utils/get-encoded-address';
import { signAndSendRemark } from 'lib/w3/transaction';
import { validateCollection } from 'rmrk-tools/dist/tools/validate-remark';

interface IProps {
  collectionFields: CollectionFormFields;
  file?: File;
  transactionStatus: ReturnType<typeof useTransactionStatus>;
}

export const mintCollection = async ({ collectionFields, file, transactionStatus }: IProps) => {
  try {
    if (!polkadotApi) {
      throw new Error('PolkadotApi is not initialised');
    }
    const { toggleAccountSelectionModal } = useAccountsStore.getState();
    const account = await db.account.get(0);
    const accountAddress = account?.web3Account?.address || '';
    if (!accountAddress) {
      toggleAccountSelectionModal(true);
      transactionStatus.warning(
        'Kusama address is required',
        'Please select an account in polkadot extension',
      );
      return;
    }

    if (!file) {
      transactionStatus.warning('Please upload an image for your collection');
      return;
    }
    const issuer = getEncodedAddress(accountAddress);
    const { description, max, name, symbol } = collectionFields;
    const metadata = await pinMetadataFile(file, { description, name, attributes: [] });

    const pubKey = u8aToHex(decodeAddress(accountAddress));
    const collection = consolidatedCollectionToInstance({
      name,
      block: 0,
      max: parseInt(max),
      issuer,
      symbol,
      id: Collection.generateId(pubKey, 'FOO'),
      metadata,
      changes: [],
    });

    if (!collection) {
      transactionStatus.warning('Cannot create your collection');
      return true;
    }

    const remark = collection.mint();
    validateCollection(remark);

    await signAndSendRemark({
      remark,
      purchaseTransaction: null,
      transactionStatus,
      pendingMessage: `Minting your collection: ${symbol}...`,
      successMessage: `Success! Your Collection "${name}" has been minted.`,
    });
    return;
  } catch (error) {
    console.log(error);
  }
};
