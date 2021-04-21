// @ts-ignore
import pinataSDK from '@pinata/sdk';
import { NFTMetadata } from 'rmrk-tools/dist/rmrk1.0.0/classes/nft';
import { Readable } from 'stream';

export type StreamPinata = Readable & {
  path?: string;
};

const pinata = pinataSDK(process.env.PINATA_KEY, process.env.PINATA_SECRET);

const defaultOptions = {
  pinataOptions: {
    cidVersion: 1,
  },
};

export const pinToIpfs = async (file: StreamPinata, name?: string) => {
  const options = { ...defaultOptions, pinataMetadata: { name } };
  const result = await pinata.pinFileToIPFS(file, options);
  return result.IpfsHash;
};

export const uploadRMRKMetadata = async (
  file: StreamPinata,
  metadataFields: NFTMetadata,
): Promise<string> => {
  const options = {
    ...defaultOptions,
    pinataMetadata: { name: metadataFields.name },
  };
  try {
    const imageHash = await pinToIpfs(file, metadataFields.name);
    const metadata = { ...metadataFields, image: `ipfs://ipfs/${imageHash}` };
    const metadataHashResult = await pinata.pinJSONToIPFS(metadata, options);
    return `ipfs://ipfs/${metadataHashResult.IpfsHash}`;
  } catch (error) {
    console.log(error);
    return '';
  }
};
