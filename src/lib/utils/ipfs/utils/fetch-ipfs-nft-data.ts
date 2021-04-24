import { sanitizeIpfsUrl, getIpfsJson } from 'lib/utils/ipfs/utils/index';
import { IPFS_PROVIDERS } from 'lib/common/ipfs-provider-links';
import { IIpfsProviders } from 'lib/types';
import { NFTMetadata } from 'rmrk-tools/dist/rmrk1.0.0/classes/nft';
import { CollectionMetadata } from 'rmrk-tools/dist/rmrk1.0.0/classes/collection';

export const fetchIpfsNftData = async (
  metadataUri?: string,
  ipfsNode?: any,
): Promise<{ data: NFTMetadata | CollectionMetadata; provider?: keyof IIpfsProviders } | null> => {
  try {
    const gatewayUrl = sanitizeIpfsUrl(metadataUri!, IPFS_PROVIDERS.cloudflare);
    const response = await fetch(gatewayUrl);

    if (response.status === 200) {
      const data = await response.json();
      return { data, provider: IPFS_PROVIDERS.cloudflare };
    }

    return null;
  } catch (error) {
    console.log(`Failed to fetch from ${IPFS_PROVIDERS.cloudflare} gateway`, error);
  }

  try {
    const gatewayUrl = sanitizeIpfsUrl(metadataUri!, IPFS_PROVIDERS.pinata);
    const response = await fetch(gatewayUrl);

    if (response.status === 200) {
      const data = await response.json();
      return { data, provider: IPFS_PROVIDERS.pinata };
    }

    return null;
  } catch (error) {
    console.log(`Failed to fetch from ${IPFS_PROVIDERS.pinata} gateway`, error);
  }

  try {
    const gatewayUrl = sanitizeIpfsUrl(metadataUri!, IPFS_PROVIDERS.ipfs);
    const response = await fetch(gatewayUrl);

    if (response.status === 200) {
      const data = await response.json();
      return { data, provider: IPFS_PROVIDERS.ipfs };
    }

    return null;
  } catch (error) {
    console.log(`Failed to fetch from ${IPFS_PROVIDERS.ipfs} gateway`, error);
  }

  if (ipfsNode) {
    try {
      const response = await getIpfsJson(ipfsNode, metadataUri);
      if (response) {
        return { data: response };
      }
    } catch (error) {
      console.log(`Failed to fetch json from ipfs`, error);
    }
  }

  return null;
};
