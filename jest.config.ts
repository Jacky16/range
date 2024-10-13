import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./src",
});

const config: Config = {
  coverageProvider: "v8",
  testMatch: ["**/?(*.)+(test).[tj]s?(x)"],
  testEnvironment: "jsdom",
  modulePathIgnorePatterns: ["spec.js"],
};

export default createJestConfig(config);
