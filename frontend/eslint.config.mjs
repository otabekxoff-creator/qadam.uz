import { defineConfig, globalIgnores } from 'eslint/config';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

const config = defineConfig([
  ...nextCoreWebVitals,
  globalIgnores([
    '.next/**',
    'node_modules/**',
    'dist/**',
    'build/**',
  ]),
]);

export default config;

