import { FlatCompat } from "@eslint/eslintrc";

// eslint-config-next 15.x ships legacy (eslintrc) configs; FlatCompat
// adapts them to ESLint 9 flat config. Works on Windows and Linux (Vercel).
const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
