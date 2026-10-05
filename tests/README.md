# Automated evaluation suite

This folder contains a dependency-light automated evaluation for the Carpentry Next.js API route handlers.

## What it tests

- Authentication: registration, duplicate email handling, successful/failed sign-in, HttpOnly JWT cookie
- Authorization: unauthenticated access to order/product administration endpoints
- Order management: listing/sorting, status updates, database error handling
- Checkout/payment: guest/authenticated fallback flow, invalid JWT behavior, Stripe session mapping, Stripe error handling
- Validation: required product fields

## Run

Base evaluation:

```bash
node --experimental-strip-types --experimental-loader ./tests/loader.mjs ./tests/run-evaluation.mjs
```

Stripe branch evaluation:

```bash
node --experimental-strip-types --experimental-loader ./tests/loader.mjs ./tests/run-stripe-evaluation.mjs
```

The scripts write JSON/CSV result files under `tests/results/`.

## Important methodology note

These tests call the project's actual API route-handler functions, but use mocks/test doubles for MongoDB, Next.js response/cookie infrastructure, bcrypt/JWT, and Stripe. The recorded durations are therefore deterministic in-process execution times, not production network latency.
