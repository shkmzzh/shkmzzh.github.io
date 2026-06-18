import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return res.status(403).json({ error: 'File deletion is only supported in development' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { filePath } = req.body;

    if (!filePath || typeof filePath !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid filePath' });
    }

    // Only allow deleting files under public/uploads/
    const resolved = path.resolve(
      path.join(process.cwd(), 'public'),
      filePath.replace(/^\/+/, '')
    );

    const allowedDir = path.resolve(process.cwd(), 'public', 'uploads');
    if (!resolved.startsWith(allowedDir)) {
      return res.status(403).json({ error: 'Can only delete files in public/uploads/' });
    }

    if (fs.existsSync(resolved)) {
      fs.unlinkSync(resolved);
      return res.status(200).json({ success: true });
    } else {
      return res.status(404).json({ error: 'File not found' });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to delete file' });
  }
}