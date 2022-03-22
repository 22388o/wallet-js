export interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

async function http<T>(request: RequestInfo): Promise<HttpResponse<T>> {
  const response: HttpResponse<T> = await fetch(request);
  try {
    // may error if there is no body
    response.parsedBody = await response.json();
  } catch (error: any) {
    throw new Error(error.message);
  }

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
}

async function get<T>(
  path: string | any,
  args: RequestInit = { method: "get" }
): Promise<HttpResponse<T>> {
  return await http<T>(new Request(path, args));
}

async function post<T>(
  body: any,
  args: RequestInit = {
    method: "post",
    body: JSON.stringify(body),
    redirect: "follow",
    headers: {
      "Content-Type": "application/json",
    },
  },
  path: string | any
): Promise<HttpResponse<T>> {
  return await http<T>(new Request(path, args));
}

async function put<T>(
  path: string | any,
  body: any,
  args: RequestInit = { method: "put", body: JSON.stringify(body) }
): Promise<HttpResponse<T>> {
  return await http<T>(new Request(path, args));
}

export { get, post, put };
export default http;
