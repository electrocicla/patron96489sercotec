import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "out/**",
      "node_modules/**",
      ".wrangler/**",
      ".wrangler-dry-run/**",
      "**/.wrangler-dry-run/**"
    ]
  },
  ...nextVitals,
  ...nextTypescript,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-unused-expressions": "error",
      "react-hooks/set-state-in-effect": "off"
    }
  }
];

export default eslintConfig;
