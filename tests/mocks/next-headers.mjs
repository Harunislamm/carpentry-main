import { state } from './state.mjs';
export async function cookies() {
  return {
    get(name) {
      const value = state.cookies?.[name];
      return value == null ? undefined : { value };
    }
  };
}
