import { DDL, TABLES } from '../generate/schemas';
import { sql } from '../../src/lib/server/database';
import { PostgresError } from 'postgres';
import { resolve } from 'path';
import { readdir } from 'fs/promises';

export async function dropTables() {
	for (const tableName of Object.values(TABLES)) {
		try {
			console.log(`droping cascade of table: ${tableName}`);
			await sql`DROP TABLE IF EXISTS ${sql(tableName)} CASCADE;`;
		} catch (e) {
			console.error(`error when deleting ${tableName}`);
			console.error(e);
		}
		console.log(`table ${tableName} deleted or already deleted`);
	}
}

export async function createTables() {
	const scriptDir = 'src-database/sql-scripts';
	const filenames = await readdir(resolve(scriptDir));

	for (const filename of filenames) {
		const scriptFile = `${scriptDir}/${filename}`;
		console.log(`executing script '${scriptFile}'`);
		await sql.file(scriptFile);
	}

	// for (const script of DDL) {
	// 	try {

	// 	} catch (e) {
	// 		if (typeof e === typeof PostgresError && e.severity !== 'NOTICE') {
	// 			console.error(`error when deleting ${script.name}`);
	// 			console.error(e);
	// 		}
	// 	}
	// 	console.log(`script ${script.name} executed`);
	// }
}
