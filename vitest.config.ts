/// <reference types="vitest" />

import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    watch: false,
    mockReset: true,
    clearMocks: true,
    passWithNoTests: true,
    include: ["./tests/**/*.test.ts"],
  },
});
