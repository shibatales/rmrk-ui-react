import { NFT } from 'rmrk-tools';
import { db } from 'lib/models/db';
import { pinMetadataFile } from 'lib/nft/pin-metadata';
import { useTransactionStatus } from 'lib/nft/transaction-status';
import { polkadotApi } from 'lib/app/get-polkadot-api';
import { useAccountsStore } from 'lib/accounts/store';
import { signAndSendRemark } from 'lib/w3/transaction';
import { NFTFormFields } from 'components/create/forms/mint-nft-form';
import { Attribute } from 'rmrk-tools/dist/rmrk1.0.0/classes/nft';
import slugify from 'slugify';
import { validateNFT } from 'rmrk-tools/dist/tools/validate-remark';

interface IProps {
  nftFields: NFTFormFields;
  file?: File;
  transactionStatus: ReturnType<typeof useTransactionStatus>;
}

const slugifyOptions = {
  replacement: '_',
  remove: undefined,
  lower: false,
  strict: true,
  locale: 'en',
};

const filterAttributes = (attributes: Attribute[]) =>
  attributes.filter((attribute) => attribute.trait_type !== '' && attribute.value !== '');

const padSerialNumber = (currentCount: number) => {
  const paddedZeros = '0000000000000000';
  const currentCountString = (currentCount + 1).toString();
  return `${paddedZeros.substr(
    0,
    paddedZeros.length - currentCountString.length,
  )}${currentCountString}`;
};

const getInstance = (name: string) => {
  return slugify(name, slugifyOptions).toUpperCase();
};

const generateNftInstance = async ({
  nftFields,
  file,
}: {
  nftFields: NFTFormFields;
  file?: File;
}): Promise<NFT> => {
  const { description, name, attributes, collection } = nftFields;
  const localCollection = await db.collections.where({ id: collection }).first();
  if (!localCollection) {
    throw new Error('Cannot mint NFT without a collection');
  }
  const currentNftCount = await db.nfts.where({ collection }).count();
  const canMint = localCollection.max === 0 || localCollection.max > currentNftCount;
  if (!canMint) {
    throw new Error(
      `"${localCollection.name}" collection is limited to ${localCollection.max} NFTs, please create new collection`,
    );
  }
  if (!file) {
    throw new Error('Please upload a file');
  }
  const serialNumber = padSerialNumber(currentNftCount);
  const metadata = await pinMetadataFile(file, {
    description,
    name,
    attributes: filterAttributes(attributes),
  });

  return new NFT(0, collection, name, getInstance(name), 1, serialNumber, metadata);
};

export const mintNft = async ({ nftFields, file, transactionStatus }: IProps) => {
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

    const nftInstance = await generateNftInstance({ nftFields, file });
    const remark = nftInstance.mintnft();
    validateNFT(remark);

    await signAndSendRemark({
      remark,
      purchaseTransaction: null,
      transactionStatus,
      pendingMessage: `Minting your NFT: "${nftFields.name}"`,
      successMessage: `Success! Your NFT "${nftFields.name}" has been minted.`,
    });
    return;
  } catch (error) {
    console.log(error);
  }
};
