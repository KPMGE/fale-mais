export default {
  // Automatically clear mock calls, instances and results before every test
  clearMocks: true,
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",
  // A preset that is used as a base for Jest's configuration
  preset: "ts-jest",
  // The glob patterns Jest uses to detect test files
  testMatch: ["**/**/*.spec.ts"],
};
