import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const MOMENTS_FILE = path.join(process.cwd(), 'src', 'data', 'moments.json');

interface Moment {
  id: number;
  avatar: string;
  name: string;
  content: string;
  images: { src: string; live?: string }[];
  timestamp: string;
  likes: number;
  comments: number;
  liked: boolean;
  tags?: string[];
}

function readMoments(): Moment[] {
  try {
    const raw = fs.readFileSync(MOMENTS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeMoments(moments: Moment[]): void {
  const dir = path.dirname(MOMENTS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(MOMENTS_FILE, JSON.stringify(moments, null, 2), 'utf-8');
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return res.status(403).json({ error: 'Moments write is only supported in development' });
  }

  try {
    switch (req.method) {
      case 'GET': {
        const moments = readMoments();
        return res.status(200).json(moments);
      }

      case 'POST': {
        const moments: Moment[] = req.body.moments;
        if (!Array.isArray(moments)) {
          return res.status(400).json({ error: 'Invalid moments array' });
        }
        writeMoments(moments);
        return res.status(200).json({ success: true });
      }

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}