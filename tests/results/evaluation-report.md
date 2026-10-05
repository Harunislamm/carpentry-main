# Carpentry Automated Evaluation Report

## Scope

The evaluation executes the project's actual Next.js API route-handler functions for authentication, order management, product administration, and checkout/payment. MongoDB, bcrypt/JWT, Next.js response/cookie services, and Stripe are replaced with deterministic test doubles so the business/API behavior can be evaluated without using production credentials or external services.

This is a small automated unit/API-handler integration evaluation. It is not a full end-to-end browser or live-network performance benchmark.

## Overall result

- Total automated tests: **18**
- Passed: **14**
- Failed: **4**
- Pass rate: **77.8%**
- Mean in-process execution time: **1.026 ms/test**
- Median in-process execution time: **0.591 ms/test**
- Range: **0.221–4.655 ms**

> Timing values are measured with mocked database/external dependencies and must not be presented as production HTTP latency.

## Results by area

| Area | Passed | Total | Pass rate | Mean time (ms) |
|---|---:|---:|---:|---:|
| Authentication | 5 | 5 | 100.0% | 1.597 |
| Order Management | 3 | 3 | 100.0% | 0.536 |
| Authorization | 0 | 4 | 0.0% | 0.539 |
| Payment / Checkout | 5 | 5 | 100.0% | 1.298 |
| Validation | 1 | 1 | 100.0% | 0.236 |

## Detailed test cases

| ID | Area | Test | Result | Time (ms) |
|---|---|---|---|---:|
| AUTH-01 | Authentication | New user registration returns 201 and hashes password | PASS | 4.655 |
| AUTH-02 | Authentication | Duplicate email registration is rejected | PASS | 0.396 |
| AUTH-03 | Authentication | Valid sign-in returns user and HttpOnly JWT cookie | PASS | 1.322 |
| AUTH-04 | Authentication | Unknown email returns generic 401 credentials error | PASS | 0.474 |
| AUTH-05 | Authentication | Wrong password returns the same generic 401 error | PASS | 1.139 |
| ORD-01 | Order Management | GET orders returns database result and requests newest-first sort | PASS | 0.819 |
| ORD-02 | Order Management | PATCH order updates status and returns updated order | PASS | 0.567 |
| ORD-03 | Order Management | Database failure while fetching orders returns 500 | PASS | 0.221 |
| AUTHZ-01 | Authorization | Unauthenticated caller must not list all customer orders | FAIL | 0.615 |
| AUTHZ-02 | Authorization | Unauthenticated caller must not update an order status | FAIL | 0.441 |
| AUTHZ-03 | Authorization | Unauthenticated caller must not create a product through admin API | FAIL | 0.446 |
| AUTHZ-04 | Authorization | Unauthenticated caller must not delete a product through admin API | FAIL | 0.653 |
| PAY-01 | Payment / Checkout | Guest checkout fallback creates Pending order when Stripe is not configured | PASS | 0.499 |
| PAY-02 | Payment / Checkout | Authenticated fallback checkout uses customer identity from verified JWT | PASS | 0.289 |
| PAY-03 | Payment / Checkout | Invalid JWT does not crash checkout and falls back to guest identity | PASS | 1.076 |
| PROD-01 | Validation | Product creation rejects missing required fields | PASS | 0.236 |
| PAY-04 | Payment / Checkout | Stripe checkout session maps cart data correctly and returns hosted URL | PASS | 3.606 |
| PAY-05 | Payment / Checkout | Stripe API failure is converted to HTTP 500 error response | PASS | 1.020 |

## Interpretation

All authentication, order-management behavior, checkout/payment behavior, and basic product validation tests passed. Four authorization tests failed. The current server-side API allows unauthenticated access to list orders, update order status, create products, and delete products. These failures are consistent with the security limitations already identified in the thesis and provide objective automated evidence for those limitations.

The failed authorization checks returned the following unexpected successful HTTP statuses:

- `GET /api/orders`: returned **200** instead of 401/403.
- `PATCH /api/orders`: returned **200** instead of 401/403.
- `POST /api/products`: returned **201** instead of 401/403.
- `DELETE /api/products/[id]`: returned **200** instead of 401/403.

## Recommendation

For the thesis, these results can be presented either as (a) an objective validation phase that confirms implemented functionality while empirically demonstrating the known authorization gaps, or (b) a baseline result followed by a second test run after server-side authorization is implemented. The second option would provide a particularly strong before/after evaluation.