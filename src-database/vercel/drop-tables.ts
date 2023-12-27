import { DDL, TABLES } from '../generate/schemas';
import { sql } from '@vercel/postgres';

export async function dropTables() {
	for (const tableName of Object.values(TABLES)) {
		try {
			await await sql.query(`DROP TABLE IF EXISTS ${tableName} CASCADE;`);
		} catch (e) {
			console.error(`error when deleting ${tableName}`);
			console.error(e);
		}
		console.log(`table ${tableName} deleted or already deleted`);
	}
}

export async function createTables() {
	for (const script of DDL) {
		try {
			await sql.query(script.generate()), { depth: null };
		} catch (e) {
			console.error(`error with script ${script.name}`);
			console.error(e);
		}
		console.log(`script ${script.name} executed`);
	}
}
