import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    ignores: ['**/node_modules/**', 'dist/**', 'tests/**'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    plugins: {
      js,
      prettier: prettierPlugin,
    },
    extends: ['js/recommended', prettierConfig],
    rules: {
      'prettier/prettier': 'error',
    },
  },
]);
