import { countPrimes, hashChain, deriveKey, matrixMultiply } from "./work";

function time(label: string, fn: () => unknown): number {
  const start = process.hrtime.bigint();
  fn();
  const ms = Number(process.hrtime.bigint() - start) / 1e6;
  console.log(`${label.padEnd(28)} ${ms.toFixed(0).padStart(8)} ms`);
  return ms;
}

console.log("CPU benchmark — identical workload on every runner\n");

let total = 0;
total += time("primes below 30,000,000", () => countPrimes(30_000_000));
total += time("sha256 chain x 2,000,000", () => hashChain("seed", 2_000_000));
total += time("pbkdf2 1,500,000 iters", () => deriveKey("hunter2", 1_500_000));
total += time("matmul 700x700 (x3)", () => {
  matrixMultiply(700, 1);
  matrixMultiply(700, 2);
  matrixMultiply(700, 3);
});

console.log(`${"-".repeat(40)}`);
console.log(`${"TOTAL".padEnd(28)} ${total.toFixed(0).padStart(8)} ms`);
