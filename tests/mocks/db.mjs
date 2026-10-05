import { state } from './state.mjs';
export default async function dbConnect() {
  if (state.dbError) throw state.dbError;
  return { connected: true };
}
