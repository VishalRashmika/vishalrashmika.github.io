import type { APIRoute } from 'astro';
import { GET as getLLMs } from '../llms.txt';

export const GET: APIRoute = async (context) => {
  return getLLMs(context);
};
