import globals from "globals";
// https://typescript-eslint.io/getting-started
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import prettierConfig from './prettier.config.js';

export default [
  {
    // Spec files ignored as eslint-plugin-jasmine currently incompatible.
    ignores: ['node_modules', 'dist']
  },
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.node }},
  eslint.configs.recommended,
  ...tseslint.configs.recommended,  
  prettierRecommended,
  {
    rules: {
      'no-console': 'warn',
      'prettier/prettier': ['warn', prettierConfig],
    },
  },
];
