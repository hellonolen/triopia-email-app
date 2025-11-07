import { router, protectedProcedure } from '../_core/trpc';
import { storagePut } from '../storage';
import { z } from 'zod';

export const uploadRouter = router({
  uploadFile: protectedProcedure
    .input(z.object({
      filename: z.string(),
      contentType: z.string(),
      data: z.string(), // base64 encoded file data
    }))
    .mutation(async ({ input }) => {
      // Decode base64 data
      const buffer = Buffer.from(input.data, 'base64');
      
      // Generate unique key
      const timestamp = Date.now();
      const key = `attachments/${timestamp}-${input.filename}`;
      
      // Upload to S3
      const result = await storagePut(key, buffer, input.contentType);
      
      return {
        key: result.key,
        url: result.url,
        size: buffer.length,
        contentType: input.contentType
      };
    }),
});
