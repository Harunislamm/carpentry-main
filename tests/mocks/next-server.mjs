function serializeCookie(name, value, options = {}) {
  const parts = [`${name}=${value}`];
  if (options.maxAge != null) parts.push(`Max-Age=${options.maxAge}`);
  if (options.path) parts.push(`Path=${options.path}`);
  if (options.httpOnly) parts.push('HttpOnly');
  if (options.secure) parts.push('Secure');
  return parts.join('; ');
}

export class NextResponse extends Response {
  static json(data, init = {}) {
    const headers = new Headers(init.headers || {});
    if (!headers.has('content-type')) headers.set('content-type', 'application/json');
    const response = new NextResponse(JSON.stringify(data), { ...init, headers });
    response._cookieJar = {};
    response.cookies = {
      set(name, value, options = {}) {
        response._cookieJar[name] = { value, options };
        response.headers.append('set-cookie', serializeCookie(name, value, options));
      }
    };
    return response;
  }
}
