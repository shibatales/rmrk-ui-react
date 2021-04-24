import { Attributes } from 'components/create/forms/mint-nft-form';
import slugify from 'slugify';

const slugifyOptions = {
  replacement: '_',
  remove: undefined,
  lower: true,
  strict: true,
  locale: 'en',
};

/**
 * Convert array of key/value attributes that user input in NFT form to NFT compatible attributes key/value pairs
 * @param attributes
 */
export const generateMetadataAttributes = (attributes: Attributes[]): { [p: string]: string }[] => {
  if (!attributes || attributes.length < 1) {
    return [];
  }

  const metadataAttributes = attributes.map((attribute) => {
    return {
      [slugify(attribute.key, slugifyOptions)]: attribute.value,
    };
  });

  return metadataAttributes;
};
