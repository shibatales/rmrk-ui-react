import { fetchIpfsNftData, sanitizeIpfsUrl, getIpfsImage } from 'lib/utils/ipfs/utils/index';
import { NFTMetadata } from 'rmrk-tools/dist/rmrk1.0.0/classes/nft';
import { CollectionMetadata } from 'rmrk-tools/dist/rmrk1.0.0/classes/collection';

export const fetchIpfsMetadata = async (
  metadatUril?: string,
  ipfsNode?: any,
): Promise<NFTMetadata | CollectionMetadata | null> => {
  try {
    const response = await fetchIpfsNftData(metadatUril, ipfsNode);
    if (response) {
      const { data, provider } = response;

      if (data && data.image) {
        if (provider) {
          return { ...data, image: sanitizeIpfsUrl(data.image, provider) };
        }

        if (ipfsNode) {
          const image = await getIpfsImage(data.image, ipfsNode);
          return { ...data, image };
        }
      }
    }
  } catch (error) {
    console.log(`Failed to fetch from gateways`, error);
  }

  return null;
};
