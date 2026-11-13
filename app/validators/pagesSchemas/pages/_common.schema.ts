import { z } from 'zod';

import { translatedFieldSchema } from '~/validators/constants';

const BaseImageSchema = z.object({
  src: z.string(),
  alt: translatedFieldSchema,
  caption: translatedFieldSchema.nullable()
});

export const resolveDemoImageSrc = (src: string) =>
  src.startsWith('/') ? src : `/api/blob-url?folderName=photos&blobName=${encodeURIComponent(src)}`;

export const ImageSchema = BaseImageSchema.transform((image) => ({
  ...image,
  generatedSrc: resolveDemoImageSrc(image.src)
}));

export const QuoteSchema = z.object({
  text: translatedFieldSchema,
  source: translatedFieldSchema
});
