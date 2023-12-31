import { defineConfig, mergeConfig } from 'vitest/config';
import baseConfig from './vite.config';

export default mergeConfig(
	baseConfig({ mode: 'development' }),
	defineConfig({
		test: {
			globals: true,
			environment: 'jsdom',
			setupFiles: ['./vitest-setup.ts'],
			include: ['tests/**/*.spec.ts']
		}
	})
);
