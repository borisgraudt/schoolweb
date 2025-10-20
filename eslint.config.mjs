import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'out/**',
      '.cache/**',
      'public/**',
      '*.config.js',
      '*.config.ts',
      '*.config.mjs',
      'script.js', // Temporary script file
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      'react/no-unescaped-entities': 'off', // Allow quotes in JSX
      '@next/next/no-img-element': 'warn', // Warn instead of error for img elements
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn', // Warn instead of error
    },
  },
];

export default eslintConfig;
