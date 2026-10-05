import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { performance } from 'node:perf_hooks';
import { resetState, state } from './mocks/state.mjs';

process.env.JWT_SECRET = 'test-jwt-secret';
delete process.env.STRIPE_SECRET_KEY;

const signup = await import('../app/api/auth/signup/route.ts');
const signin = await import('../app/api/auth/signin/route.ts');
const orders = await import('../app/api/orders/route.ts');
const products = await import('../app/api/products/route.ts');
const productById = await import('../app/api/products/[id]/route.ts');
const checkoutFallback = await import('../app/api/checkout/route.ts?fallback');

async function json(response) { return await response.json(); }
function req(url, method, body, headers = {}) {
  return new Request(url, {
    method,
    headers: { 'content-type': 'application/json', ...headers },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

const results = [];
async function run(id, category, name, fn, expected = 'pass') {
  resetState();
  const start = performance.now();
  let actual = 'pass';
  let detail = '';
  try {
    await fn();
  } catch (e) {
    actual = 'fail';
    detail = e?.message || String(e);
  }
  const durationMs = +(performance.now() - start).toFixed(3);
  const outcome = actual === expected ? 'PASS' : 'FAIL';
  results.push({ id, category, name, expected, actual, outcome, durationMs, detail });
  const icon = outcome === 'PASS' ? '✓' : '✗';
  console.log(`${icon} ${id} [${category}] ${name} — ${outcome} (${durationMs} ms)${detail ? ` :: ${detail}` : ''}`);
}

await run('AUTH-01', 'Authentication', 'New user registration returns 201 and hashes password', async () => {
  state.userFindOneResult = null;
  const response = await signup.POST(req('http://test/api/auth/signup', 'POST', { name: 'Test User', email: 'test@example.com', password: 'Secret123!' }));
  assert.equal(response.status, 201);
  assert.equal((await json(response)).message, 'User created successfully');
  assert.equal(state.userCreated.length, 1);
  assert.equal(state.userCreated[0].password, 'hashed:12:Secret123!');
  assert.notEqual(state.userCreated[0].password, 'Secret123!');
});

await run('AUTH-02', 'Authentication', 'Duplicate email registration is rejected', async () => {
  state.userFindOneResult = { _id: 'existing' };
  const response = await signup.POST(req('http://test/api/auth/signup', 'POST', { name: 'Test', email: 'used@example.com', password: 'Secret123!' }));
  assert.equal(response.status, 400);
  assert.equal((await json(response)).error, 'Email already in use');
});

await run('AUTH-03', 'Authentication', 'Valid sign-in returns user and HttpOnly JWT cookie', async () => {
  state.userFindOneResult = { _id: 'u1', name: 'Harun', email: 'h@example.com', password: 'hashed:12:correct', role: 'admin' };
  const response = await signin.POST(req('http://test/api/auth/signin', 'POST', { email: 'h@example.com', password: 'correct' }));
  assert.equal(response.status, 200);
  const body = await json(response);
  assert.equal(body.user.role, 'admin');
  assert.match(response.headers.get('set-cookie') || '', /token=/);
  assert.match(response.headers.get('set-cookie') || '', /HttpOnly/i);
  assert.equal(state.jwtSigned[0].payload.role, 'admin');
  assert.equal(state.jwtSigned[0].options.expiresIn, '1d');
});

await run('AUTH-04', 'Authentication', 'Unknown email returns generic 401 credentials error', async () => {
  state.userFindOneResult = null;
  const response = await signin.POST(req('http://test/api/auth/signin', 'POST', { email: 'none@example.com', password: 'whatever' }));
  assert.equal(response.status, 401);
  assert.equal((await json(response)).error, 'Invalid credentials');
});

await run('AUTH-05', 'Authentication', 'Wrong password returns the same generic 401 error', async () => {
  state.userFindOneResult = { _id: 'u1', name: 'Harun', email: 'h@example.com', password: 'hashed:12:correct', role: 'user' };
  const response = await signin.POST(req('http://test/api/auth/signin', 'POST', { email: 'h@example.com', password: 'wrong' }));
  assert.equal(response.status, 401);
  assert.equal((await json(response)).error, 'Invalid credentials');
});

await run('ORD-01', 'Order Management', 'GET orders returns database result and requests newest-first sort', async () => {
  state.orderList = [{ _id: 'o2' }, { _id: 'o1' }];
  const response = await orders.GET();
  assert.equal(response.status, 200);
  assert.deepEqual(await json(response), state.orderList);
  assert.deepEqual(state.orderSortArg, { createdAt: -1 });
});

await run('ORD-02', 'Order Management', 'PATCH order updates status and returns updated order', async () => {
  state.orderUpdated = { _id: 'o1', status: 'Shipped' };
  const response = await orders.PATCH(req('http://test/api/orders', 'PATCH', { id: 'o1', status: 'Shipped' }));
  assert.equal(response.status, 200);
  assert.deepEqual(await json(response), state.orderUpdated);
  assert.deepEqual(state.orderUpdateArgs, { id: 'o1', update: { status: 'Shipped' }, options: { new: true } });
});

await run('ORD-03', 'Order Management', 'Database failure while fetching orders returns 500', async () => {
  state.orderFindError = new Error('database offline');
  const response = await orders.GET();
  assert.equal(response.status, 500);
  assert.equal((await json(response)).error, 'Failed to fetch orders');
});

await run('AUTHZ-01', 'Authorization', 'Unauthenticated caller must not list all customer orders', async () => {
  state.orderList = [{ _id: 'private-order', email: 'customer@example.com' }];
  const response = await orders.GET();
  assert.ok([401, 403].includes(response.status), `Expected 401/403 but received ${response.status}`);
});

await run('AUTHZ-02', 'Authorization', 'Unauthenticated caller must not update an order status', async () => {
  state.orderUpdated = { _id: 'o1', status: 'Delivered' };
  const response = await orders.PATCH(req('http://test/api/orders', 'PATCH', { id: 'o1', status: 'Delivered' }));
  assert.ok([401, 403].includes(response.status), `Expected 401/403 but received ${response.status}`);
});

await run('AUTHZ-03', 'Authorization', 'Unauthenticated caller must not create a product through admin API', async () => {
  const response = await products.POST(req('http://test/api/products', 'POST', { name: 'Chair', price: 100, category: 'Chairs', material: 'Oak', image: '/chair.jpg' }));
  assert.ok([401, 403].includes(response.status), `Expected 401/403 but received ${response.status}`);
});

await run('AUTHZ-04', 'Authorization', 'Unauthenticated caller must not delete a product through admin API', async () => {
  state.productDeleted = { _id: 'p1' };
  const response = await productById.DELETE(req('http://test/api/products/p1', 'DELETE'), { params: Promise.resolve({ id: 'p1' }) });
  assert.ok([401, 403].includes(response.status), `Expected 401/403 but received ${response.status}`);
});

await run('PAY-01', 'Payment / Checkout', 'Guest checkout fallback creates Pending order when Stripe is not configured', async () => {
  const items = [{ _id: 'p1', name: 'Oak Chair', price: 250, quantity: 2, image: '/chair.jpg' }];
  const response = await checkoutFallback.POST(req('http://test/api/checkout', 'POST', { items, total: 500, shippingAddress: '1 Test Street' }, { origin: 'http://test' }));
  assert.equal(response.status, 201);
  const body = await json(response);
  assert.equal(body.orderId, 'order-created-1');
  assert.equal(state.orderCreated[0].customerName, 'Guest');
  assert.equal(state.orderCreated[0].email, 'guest@example.com');
  assert.equal(state.orderCreated[0].status, 'Pending');
  assert.equal(state.orderCreated[0].total, 500);
});

await run('PAY-02', 'Payment / Checkout', 'Authenticated fallback checkout uses customer identity from verified JWT', async () => {
  state.cookies.token = 'valid-token';
  state.jwtDecoded = { userId: 'u42', role: 'user' };
  state.userByIdResult = { name: 'Alice', email: 'alice@example.com' };
  const response = await checkoutFallback.POST(req('http://test/api/checkout', 'POST', { items: [], total: 125, shippingAddress: '2 Test Street' }));
  assert.equal(response.status, 201);
  assert.equal(state.userFindById, 'u42');
  assert.equal(state.orderCreated[0].customerName, 'Alice');
  assert.equal(state.orderCreated[0].email, 'alice@example.com');
});

await run('PAY-03', 'Payment / Checkout', 'Invalid JWT does not crash checkout and falls back to guest identity', async () => {
  state.cookies.token = 'invalid-token';
  const response = await checkoutFallback.POST(req('http://test/api/checkout', 'POST', { items: [], total: 50, shippingAddress: '3 Test Street' }));
  assert.equal(response.status, 201);
  assert.equal(state.orderCreated[0].customerName, 'Guest');
  assert.equal(state.orderCreated[0].email, 'guest@example.com');
});

await run('PROD-01', 'Validation', 'Product creation rejects missing required fields', async () => {
  const response = await products.POST(req('http://test/api/products', 'POST', { name: 'Incomplete Product', price: 100 }));
  assert.equal(response.status, 400);
  assert.equal((await json(response)).error, 'Missing required fields');
});

const summary = {
  generatedAt: new Date().toISOString(),
  environment: {
    runner: 'Node.js built-in assertion harness with ESM loader and mocked DB/external services',
    node: process.version,
    note: 'Durations are in-process handler execution times with mocked dependencies; they are not production HTTP/network latency.'
  },
  total: results.length,
  passed: results.filter(r => r.outcome === 'PASS').length,
  failed: results.filter(r => r.outcome === 'FAIL').length,
  averageDurationMs: +(results.reduce((a, r) => a + r.durationMs, 0) / results.length).toFixed(3),
  results
};

fs.mkdirSync(new URL('./results/', import.meta.url), { recursive: true });
fs.writeFileSync(new URL('./results/evaluation-results.json', import.meta.url), JSON.stringify(summary, null, 2));
const csv = ['id,category,name,outcome,duration_ms,detail', ...results.map(r => [r.id, r.category, r.name, r.outcome, r.durationMs, (r.detail || '').replaceAll('"','""')].map((v,i)=>i===2||i===5?`"${v}"`:v).join(','))].join('\n');
fs.writeFileSync(new URL('./results/evaluation-results.csv', import.meta.url), csv);
console.log(`\nSUMMARY: ${summary.passed}/${summary.total} passed; ${summary.failed} failed; average ${summary.averageDurationMs} ms/test.`);
if (summary.failed) process.exitCode = 1;
