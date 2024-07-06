import type { APIContext } from "astro";

export async function GET({}: APIContext) {
  return new Response('export const search = () => {return {results: []}}', {
    headers: {
      'Content-Type': 'application/javascript',
    },
    status: 200,
  });
}