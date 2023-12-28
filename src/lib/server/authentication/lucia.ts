import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { pg, postgres } from '@lucia-auth/adapter-postgresql';
import { db } from '@vercel/postgres';
import { AuthenticationTables, postgresSql as sql } from '$lib/server/database';
import { POSTGRES_HOST } from '$env/static/private';

export const auth = lucia({
	env: import.meta.env.PROD ? 'PROD' : 'DEV',
	adapter: POSTGRES_HOST.match(/localhost/i)
		? postgres(sql, AuthenticationTables)
		: pg(db, AuthenticationTables),
	middleware: sveltekit(),
	getUserAttributes: (databaseUser) => {
		return {
			createAt: databaseUser.create_at
		};
	}
});

export type Auth = typeof auth;
export { type AuthRequest, LuciaError as AuthError, type Key, type Session } from 'lucia';
