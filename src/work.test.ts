import { countPrimes, hashChain, deriveKey, matrixMultiply } from "./work";

describe("countPrimes", () => {
  it("counts primes below small limits", () => {
    expect(countPrimes(10)).toBe(4); // 2, 3, 5, 7
    expect(countPrimes(100)).toBe(25);
  });

  it("handles a large sieve (CPU-heavy)", () => {
    expect(countPrimes(10_000_000)).toBe(664_579);
  });
});

describe("hashChain", () => {
  it("is deterministic", () => {
    expect(hashChain("abc", 10)).toBe(hashChain("abc", 10));
  });

  it("survives a long chain (CPU-heavy)", () => {
    const digest = hashChain("demo", 500_000);
    expect(digest).toHaveLength(64);
  });
});

describe("deriveKey", () => {
  it("derives a stable key (CPU-heavy)", () => {
    const key = deriveKey("password", 400_000);
    expect(key).toHaveLength(128);
    expect(key).toBe(deriveKey("password", 400_000));
  });
});

describe("matrixMultiply", () => {
  it("is deterministic for a given seed", () => {
    expect(matrixMultiply(50, 7)).toBeCloseTo(matrixMultiply(50, 7));
  });

  it("multiplies large matrices (CPU-heavy)", () => {
    const checksum = matrixMultiply(500);
    expect(Number.isFinite(checksum)).toBe(true);
    expect(checksum).toBeGreaterThan(0);
  });
});
