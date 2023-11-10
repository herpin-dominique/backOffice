import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
  return new Response("GET!");
};
export const POST: RequestHandler = async () => {
  return new Response("POST!");
};
export const PUT: RequestHandler = async () => {
  return new Response("PUT!");
};
export const PATCH: RequestHandler = async () => {
  return new Response("PATCH!");
};
export const DELETE: RequestHandler = async () => {
  return new Response("DELETE!");
};
