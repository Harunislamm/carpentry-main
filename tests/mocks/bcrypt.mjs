export async function hash(password, rounds) { return `hashed:${rounds}:${password}`; }
export async function compare(password, stored) { return stored === `hashed:12:${password}` || stored === `hashed:${password}`; }
export default { hash, compare };
