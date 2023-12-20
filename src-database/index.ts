import { buildImage } from './docker-build';
import { generateSqlScripts } from './generate';

/**
 * Task resolution mapper
 */
const tasks = {
	'create-sql-scripts': async () => await generateSqlScripts(),
	'create-docker-image': async () => await buildImage()
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
