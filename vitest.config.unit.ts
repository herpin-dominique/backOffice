import { defineConfig, mergeConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';
import baseConfig from './vitest.config';

export default mergeConfig(
	baseConfig({ mode: 'development' }),
	defineConfig({
		plugins: [svelte({ hot: !process.env.VITEST })],
		test: {
			environment: 'jsdom',
			setupFiles: ['./vitest-setup.ts'],
			include: ['src/**/*.test.ts']
		}
	})
);
