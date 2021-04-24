import { getIpfsCid } from 'lib/utils/ipfs/utils/index';
import { NFTMetadata } from 'rmrk-tools/dist/rmrk1.0.0/classes/nft';
import { CollectionMetadata } from 'rmrk-tools/dist/rmrk1.0.0/classes/collection';

export const getIpfsJson = async (
  ipfsNode: any,
  metadataUri?: string,
): Promise<NFTMetadata | CollectionMetadata | null> => {
  if (!metadataUri || !ipfsNode) return null;

  try {
    const cid = getIpfsCid(metadataUri);
    const stream = ipfsNode.cat(cid);
    let data = '';

    for await (const chunk of stream) {
      data += chunk.toString();
    }

    return JSON.parse(data);
  } catch (error) {
    console.log('FAILED TO FETCH JSON FROM IPFS:', { error });
    return null;
  }
};
