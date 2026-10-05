import assert from 'node:assert/strict';
import fs from 'node:fs';
import { performance } from 'node:perf_hooks';
import { resetState, state } from './mocks/state.mjs';

process.env.JWT_SECRET = 'test-jwt-secret';
process.env.STRIPE_SECRET_KEY = 'sk_test_mock';

const checkoutStripe = await import('../app/api/checkout/route.ts?stripe');

async function json(response) { return await response.json(); }
function req(url, method, body, headers = {}) {
  return new Request(url, {
    method,
    headers: { 'content-type': 'application/json', ...headers },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

const results = [];
async function run(id, category, name, fn) {
  resetState();
  const start = performance.now();
  let outcome = 'PASS';
  let detail = '';
  try { await fn(); } catch (e) { outcome = 'FAIL'; detail = e?.message || String(e); }
  const durationMs = +(performance.now() - start).toFixed(3);
  results.push({ id, category, name, outcome, durationMs, detail });
  console.log(`${outcome === 'PASS' ? '✓' : '✗'} ${id} [${category}] ${name} — ${outcome} (${durationMs} ms)${detail ? ` :: ${detail}` : ''}`);
}

await run('PAY-04', 'Payment / Checkout', 'Stripe checkout session maps cart data correctly and returns hosted URL', async () => {
  state.stripeSessionUrl = 'https://checkout.stripe.test/session/abc';
  const items = [{ _id: 'p1', name: 'Walnut Table', price: 1299.99, quantity: 2, image: '/images/table.jpg' }];
  const response = await checkoutStripe.POST(req('http://shop.test/api/checkout', 'POST', {
    items,
    total: 2599.98,
    shippingAddress: '10 Main Street'
  }, { origin: 'http://shop.test' }));
  assert.equal(response.status, 200);
  assert.equal((await json(response)).url, state.stripeSessionUrl);
  const input = state.stripeSessionInput;
  assert.equal(input.mode, 'payment');
  assert.equal(input.customer_email, 'guest@example.com');
  assert.equal(input.line_items[0].price_data.currency, 'usd');
  assert.equal(input.line_items[0].price_data.unit_amount, 129999);
  assert.equal(input.line_items[0].quantity, 2);
  assert.equal(input.line_items[0].price_data.product_data.images[0], 'http://shop.test/images/table.jpg');
  assert.equal(input.success_url, 'http://shop.test/?success=true');
  assert.equal(input.cancel_url, 'http://shop.test/?canceled=true');
  assert.equal(input.metadata.address, '10 Main Street');
});

await run('PAY-05', 'Payment / Checkout', 'Stripe API failure is converted to HTTP 500 error response', async () => {
  state.stripeThrows = new Error('Stripe unavailable');
  const response = await checkoutStripe.POST(req('http://shop.test/api/checkout', 'POST', {
    items: [{ _id: 'p1', name: 'Chair', price: 100, quantity: 1, image: '/chair.jpg' }],
    total: 100,
    shippingAddress: '10 Main Street'
  }, { origin: 'http://shop.test' }));
  assert.equal(response.status, 500);
  assert.equal((await json(response)).error, 'Stripe unavailable');
});

const summary = {
  generatedAt: new Date().toISOString(),
  total: results.length,
  passed: results.filter(r => r.outcome === 'PASS').length,
  failed: results.filter(r => r.outcome === 'FAIL').length,
  results
};
fs.writeFileSync(new URL('./results/stripe-results.json', import.meta.url), JSON.stringify(summary, null, 2));
if (summary.failed) process.exitCode = 1;
