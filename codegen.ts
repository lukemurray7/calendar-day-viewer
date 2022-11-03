import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./schemas/schema.graphql",
  generates: {
    "./types/resolvers-types.ts": {
      config: {
        useIndexSignature: true,
      },
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};
export default config;
