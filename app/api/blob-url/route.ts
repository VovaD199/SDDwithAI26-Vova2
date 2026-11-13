import { readFile } from 'fs/promises';
import path from 'path';

import { NextResponse } from 'next/server';

import { errorResponse } from '~/utils/apiResponse';
import { validateWithZod } from '~/utils/validateRequestData';

import { zBlobQuerySchema } from '~/validators/queryParams.schema';

export const runtime = 'nodejs';

const publicDir = path.join(process.cwd(), 'public');
const transparentPng = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII=',
  'base64'
);

const contentTypes: Record<string, string> = {
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.mp3': 'audio/mpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.wav': 'audio/wav'
};

const resolveDemoBlobPath = (folderName: string, blobName: string) => {
  if (blobName.startsWith('/')) return blobName;

  return `/mock-blob/${folderName}/${blobName}`;
};

const resolvePublicFilePath = (demoBlobPath: string) => {
  const normalizedPath = path.normalize(path.join(publicDir, demoBlobPath.replace(/^\/+/, '')));

  return normalizedPath.startsWith(`${publicDir}${path.sep}`) ? normalizedPath : null;
};

const localFileResponse = async (demoBlobPath: string, folderName: string) => {
  const filePath = resolvePublicFilePath(demoBlobPath);

  if (!filePath) return errorResponse(['Invalid blob path'], 400);

  try {
    const file = await readFile(filePath);
    const contentType = contentTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream';

    return new NextResponse(new Uint8Array(file), {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Type': contentType
      }
    });
  } catch {
    if (folderName === 'photos') {
      return new NextResponse(new Uint8Array(transparentPng), {
        headers: {
          'Cache-Control': 'no-store',
          'Content-Type': 'image/png'
        }
      });
    }

    return errorResponse([`No mock blob found: ${demoBlobPath}`], 404);
  }
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const validationResult = validateWithZod(
    {
      blobName: searchParams.get('blobName'),
      folderName: searchParams.get('folderName')
    },
    zBlobQuerySchema
  );

  if (!validationResult.valid) return errorResponse(validationResult.errors);

  const { folderName, blobName } = validationResult.value;

  return localFileResponse(resolveDemoBlobPath(folderName, blobName), folderName);
}
