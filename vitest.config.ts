import { defineConfig } from 'vitest/config';
import { loadEnv } from 'vite';

export default ({ mode }: { mode: string }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };

	return defineConfig({
		test: {
			globals: true
		}
	});
};
