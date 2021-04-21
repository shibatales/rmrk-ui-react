import { NFTMetadata } from 'rmrk-tools/dist/rmrk1.0.0/classes/nft';
import { pinMetadata } from 'lib/utils/api';

export const pinMetadataFile = async (file: File, metadata: NFTMetadata) => {
  try {
    const data = new FormData();
    data.append('files', file);
    data.append('metadata', JSON.stringify(metadata));
    const { ipfsUrl } = await pinMetadata(data);
    return ipfsUrl;
  } catch (e) {
    // show error
  }
};
