import "@testing-library/jest-dom";

// Polyfill for TextEncoder in Jest (Node)
if (typeof global.TextEncoder === "undefined") {
  const { TextEncoder, TextDecoder } = require("util");
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}
