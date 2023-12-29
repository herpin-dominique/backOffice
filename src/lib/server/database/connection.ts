import {
	POSTGRES_DATABASE,
	POSTGRES_HOST,
	POSTGRES_PASSWORD,
	POSTGRES_USER
} from '$env/static/private';
import postgres from 'postgres';

export const sql = postgres({
	host: POSTGRES_HOST,
	user: POSTGRES_USER,
	password: POSTGRES_PASSWORD,
	database: POSTGRES_DATABASE,
	ssl: POSTGRES_HOST.match(/localhost/i) ? 'prefer' : 'require'
});
