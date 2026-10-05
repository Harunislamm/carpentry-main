export const state = globalThis.__carpentryTestState || (globalThis.__carpentryTestState = {});

export function resetState() {
  for (const key of Object.keys(state)) delete state[key];
  state.dbError = null;
  state.userFindOneResult = null;
  state.userCreateResult = null;
  state.userCreated = [];
  state.userByIdResult = null;
  state.orderList = [];
  state.orderSortArg = null;
  state.orderUpdated = null;
  state.orderUpdateArgs = null;
  state.orderCreated = [];
  state.productList = [];
  state.productCreated = [];
  state.productFindByIdResult = null;
  state.productDeleted = null;
  state.cookies = {};
  state.jwtDecoded = { userId: 'user-1', role: 'user' };
  state.jwtSigned = [];
  state.stripeSessionUrl = 'https://stripe.test/session/123';
  state.stripeSessionInput = null;
  state.stripeThrows = null;
}

resetState();
