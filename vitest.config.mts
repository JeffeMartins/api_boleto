import {defineConfig} from 'vitest/config';
export default defineConfig({test:{globals:true,setupFiles:['_tests_/setup.ts'],include:['_tests_/**/*.test.ts']}});
