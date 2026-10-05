import { state } from './state.mjs';
export default class Stripe {
  constructor(secret, options) {
    state.stripeConstructor = { secret, options };
    this.checkout = {
      sessions: {
        create: async (input) => {
          state.stripeSessionInput = input;
          if (state.stripeThrows) throw state.stripeThrows;
          return { url: state.stripeSessionUrl };
        }
      }
    };
  }
}
