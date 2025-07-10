import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'teacher-images',
  apiKey: process.env.MICROCMS_API_KEY!,
});