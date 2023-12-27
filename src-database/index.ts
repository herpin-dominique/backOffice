import { buildImage } from './docker-build';
import { generateSqlScripts } from './generate';
import { createTables, dropTables } from './vercel/drop-tables';

/**
 * Task resolution mapper
 */
const tasks = {
	'create-sql-scripts': async () => await generateSqlScripts(),
	'create-docker-image': async () => await buildImage(),
	'drop-tables': async () => await dropTables(),
	'create-tables': async () => await createTables()
};
const command = process.argv[process.argv.length - 1];

/**
 * Run task
 */
try {
	await tasks[command]();
} catch (e) {
	if (e.message === 'tasks[command] is not a function') {
		console.error(`unknown command: ${command}`);
		console.error(`expected one of: ${Object.keys(tasks)}`);
	} else console.error(e);
}
