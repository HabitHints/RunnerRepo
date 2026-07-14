import { createHash, pbkdf2Sync } from "crypto";

/** Sieve of Eratosthenes — returns the count of primes below `limit`. */
export function countPrimes(limit: number): number {
  const sieve = new Uint8Array(limit);
  let count = 0;
  for (let i = 2; i < limit; i++) {
    if (sieve[i] === 0) {
      count++;
      for (let j = i * 2; j < limit; j += i) {
        sieve[j] = 1;
      }
    }
  }
  return count;
}

/** Chains SHA-256 `rounds` times over a seed string. */
export function hashChain(seed: string, rounds: number): string {
  let digest = seed;
  for (let i = 0; i < rounds; i++) {
    digest = createHash("sha256").update(digest).digest("hex");
  }
  return digest;
}

/** Deliberately expensive key derivation (single-threaded CPU burn). */
export function deriveKey(password: string, iterations: number): string {
  return pbkdf2Sync(password, "demo-salt", iterations, 64, "sha512").toString(
    "hex"
  );
}

/** Naive O(n^3) matrix multiply on random square matrices of size `n`. */
export function matrixMultiply(n: number, seed = 42): number {
  const a = new Float64Array(n * n);
  const b = new Float64Array(n * n);
  let state = seed;
  const rand = () => {
    state = (state * 1103515245 + 12345) % 2147483648;
    return state / 2147483648;
  };
  for (let i = 0; i < n * n; i++) {
    a[i] = rand();
    b[i] = rand();
  }
  const c = new Float64Array(n * n);
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < n; k++) {
      const aik = a[i * n + k];
      for (let j = 0; j < n; j++) {
        c[i * n + j] += aik * b[k * n + j];
      }
    }
  }
  // Return a checksum so the work can't be optimized away.
  let sum = 0;
  for (let i = 0; i < n * n; i++) sum += c[i];
  return sum;
}
