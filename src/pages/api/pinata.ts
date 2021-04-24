import { NextApiRequest, NextApiResponse } from 'next';
import { NFTMetadata } from 'rmrk-tools/dist/rmrk1.0.0/classes/nft';
import { StreamPinata, uploadRMRKMetadata } from 'lib/pinata/pin-metadata';
import multer from 'multer';
import { Readable } from 'stream';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

const upload = multer({
  // 20Mb in bytes
  limits: { fileSize: 20971520 },
});

type NextApiRequestWithFormData = NextApiRequest & {
  files: any[];
};

type BlobCorrected = Blob & {
  buffer: Buffer;
};

const handler = async (req: NextApiRequestWithFormData, res: NextApiResponse) => {
  await runMiddleware(req, res, upload.any());

  if (req.method !== 'POST') {
    res.status(404).json({ status: 404 });
  }

  try {
    // This operation expects a single file upload. Edit as needed.
    if (!req.files?.length || req.files.length > 1) {
      res.statusCode = 400;
      res.end();
      return;
    }

    const metadataFields: NFTMetadata = JSON.parse(req.body.metadata);
    const blob: BlobCorrected = req.files[0];

    const stream: StreamPinata = Readable.from(blob.buffer);
    // @TODO
    stream.path = 'some_filename.png';

    const ipfsUrl = await uploadRMRKMetadata(stream, metadataFields);
    console.log(ipfsUrl);
    res.status(200).json({ ipfsUrl });
  } catch (err) {
    console.log(err);
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
