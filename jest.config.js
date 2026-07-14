/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 120000,
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
