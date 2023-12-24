export function resolveEnvTableName(name: string) {
	const env_prefixs: Record<string, string> = {
		production: 'prd',
		development: 'dev'
	};

	const prefix = env_prefixs[import.meta.env.MODE];

	if (prefix === undefined) {
		console.error({ mode: import.meta.env.MODE, message: 'unhandled mode' });
		process.exit(16);
	}

	return `${prefix}_${name}`;
}
