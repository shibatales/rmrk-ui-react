import { IRmrk, IIpfsProviders } from 'lib/types';

export const ipfs_providers = {
  cloudflare: 'https://cloudflare-ipfs.com/',
  ipfs: 'https://ipfs.io/',
  pinata: 'https://gateway.pinata.cloud/',
};

const resolveProvider = (provider?: keyof IIpfsProviders) =>
  provider ? ipfs_providers[provider] : ipfs_providers.ipfs;

export const sanitizeIpfsUrl = (ipfsUrl: string, provider?: IPFS_PROVIDERS) => {
  const rr = /^ipfs:\/\/ipfs/;
  if (rr.test(ipfsUrl)) {
    return ipfsUrl.replace('ipfs://', resolveProvider(provider));
  }

  const r = /^ipfs:\/\//;
  if (r.test(ipfsUrl)) {
    return ipfsUrl.replace('ipfs://', `${resolveProvider(provider)}ipfs/`);
  }

  return ipfsUrl;
};

export const fetchRmrkMetadata = async (rmrk: IRmrk, data = {}) => {
  if (!rmrk.metadata) return;

  const url = sanitizeIpfsUrl(rmrk.metadata);
  const response = await fetch(url);

  return response;
};
