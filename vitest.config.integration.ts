import { defineConfig, mergeConfig } from 'vitest/config';
import baseConfig from './vitest.config';
import { sveltekit } from '@sveltejs/kit/vite';

export default mergeConfig(
	baseConfig({ mode: 'development' }),
	defineConfig({
		plugins: [sveltekit()],
		test: {
			include: ['tests/**/*.spec.ts']
		}
	})
);
