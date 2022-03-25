import fetch, { RequestInit } from "node-fetch";

export async function http(path: string, args: RequestInit) {
  const response = await fetch(path, args);
  try {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function get(path: string, args: RequestInit) {
  return await http(path, args);
}
export async function post(path: string, args: RequestInit) {
  return await http(path, args);
}
export async function put(
  path: string,
  body: any,
  args: RequestInit = { method: "put", body: JSON.stringify(body) }
) {
  return await http(path, args);
}
