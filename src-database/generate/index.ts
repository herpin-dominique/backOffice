import { generateAuthentationTablesDDL, generateUserTablesDDL } from './schemas';
import { formatSQL } from './formatter';
import fs from 'fs';

export async function generateSqlScripts() {
	// clean and create sql script directory
	const scriptDir = 'src-database/sql-scripts';
	if (fs.existsSync(scriptDir)) fs.rmSync(scriptDir, { recursive: true });
	fs.mkdirSync(scriptDir);

	// pack all DDL data
	const ddl: Record<string, string> = {
		authentication: generateAuthentationTablesDDL(),
		users: generateUserTablesDDL()
	};

	// create a file for each DDL key in sql script directory
	Object.keys(ddl).forEach(async (key) => {
		const data = (await formatSQL(ddl[key])) || '';
		fs.writeFileSync(`${scriptDir}/${key}.sql`, data);
	});
}
