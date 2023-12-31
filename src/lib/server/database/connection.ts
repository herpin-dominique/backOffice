import postgres from 'postgres';

export const sql = postgres({
	host: process.env.POSTGRES_HOST,
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DATABASE,
	ssl: (process.env.POSTGRES_HOST as string).match(/localhost/i) ? 'prefer' : 'require'
});
