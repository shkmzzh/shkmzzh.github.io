import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Allow uploading files up to 10MB
    },
  },
};

type Data = {
  url?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Only allow this API to run in development environment for security
  if (process.env.NODE_ENV !== 'development') {
    return res.status(403).json({ error: 'Upload is only supported in development environment' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { filename, filedata } = req.body;

    if (!filename || !filedata) {
      return res.status(400).json({ error: 'Missing filename or filedata' });
    }

    // Clean up base64 header if present (e.g., data:image/png;base64,...)
    const base64Data = filedata.replace(/^data:.*,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Ensure public/uploads directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Create unique filename to avoid overwriting
    const ext = path.extname(filename);
    const nameWithoutExt = path.basename(filename, ext);
    const uniqueFilename = `${nameWithoutExt}_${Date.now()}${ext}`;
    const filePath = path.join(uploadDir, uniqueFilename);

    // Write file to project's public/uploads/ folder
    fs.writeFileSync(filePath, buffer);

    const relativeUrl = `/uploads/${uniqueFilename}`;
    res.status(200).json({ url: relativeUrl });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to upload file' });
  }
}
