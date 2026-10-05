import { pathToFileURL, fileURLToPath } from 'node:url';
import path from 'node:path';
const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const mocks = path.join(here, 'mocks');
const exact = new Map([
  ['next/server', path.join(mocks, 'next-server.mjs')],
  ['next/headers', path.join(mocks, 'next-headers.mjs')],
  ['bcryptjs', path.join(mocks, 'bcrypt.mjs')],
  ['jsonwebtoken', path.join(mocks, 'jwt.mjs')],
  ['stripe', path.join(mocks, 'stripe.mjs')],
  ['@/lib/mongodb', path.join(mocks, 'db.mjs')],
  ['@/models/User', path.join(mocks, 'user.mjs')],
  ['@/models/Order', path.join(mocks, 'order.mjs')],
  ['@/models/Product', path.join(mocks, 'product.mjs')],
]);
export async function resolve(specifier, context, nextResolve) {
  if (exact.has(specifier)) return { url: pathToFileURL(exact.get(specifier)).href, shortCircuit: true };
  if (specifier.startsWith('@/')) {
    const rel = specifier.slice(2);
    return { url: pathToFileURL(path.join(root, rel)).href, shortCircuit: true };
  }
  return nextResolve(specifier, context);
}
