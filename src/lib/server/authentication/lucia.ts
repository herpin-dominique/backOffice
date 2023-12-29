import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { postgres } from '@lucia-auth/adapter-postgresql';
import { AuthenticationTables, sql } from '$lib/server/database';

export const auth = lucia({
	env: import.meta.env.PROD ? 'PROD' : 'DEV',
	adapter: postgres(sql, AuthenticationTables),
	middleware: sveltekit(),
	getUserAttributes: (databaseUser) => {
		return {
			createAt: databaseUser.create_at
		};
	}
});

export type Auth = typeof auth;
export { type AuthRequest, LuciaError as AuthError, type Key, type Session } from 'lucia';
