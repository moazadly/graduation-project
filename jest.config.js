// jest.config.js
const nextJest = require("next/jest");
const createJestConfig = nextJest({ dir: "./" });

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    // → existing mappings:
    "^@/(.*)$": "<rootDir>/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",

    // ← Add this line to point "lucide-react" to your manual mock
    "^lucide-react$": "<rootDir>/__mocks__/lucide-react.js",
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(lucide-react)/)", // ← (you can leave this, but the mock prevents Jest from loading the real ESM)
  ],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
};

module.exports = createJestConfig(customJestConfig);
