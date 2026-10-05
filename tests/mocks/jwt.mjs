import { state } from './state.mjs';
export function sign(payload, secret, options) {
  state.jwtSigned.push({ payload, secret, options });
  return `signed.${payload.userId}.${payload.role}`;
}
export function verify(token, secret) {
  state.jwtVerifyArgs = { token, secret };
  if (token === 'invalid-token') throw new Error('invalid token');
  return state.jwtDecoded;
}
export default { sign, verify };
