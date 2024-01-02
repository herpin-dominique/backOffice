import { exec, spawn } from 'child_process';
import { randomBytes } from 'crypto';
import fs from 'fs';

function execute(command: string) {
	return new Promise((resolve, reject) => {
		const [docker, ...args] = command.split(' ');
		const job = spawn(docker, args);
		job.stdout.pipe(process.stdout);
		job.stderr.pipe(process.stderr);
		job.on('exit', (code) => {
			resolve(code);
		});
	});
}

export async function buildImage() {
	const envFile = '.env.development.local';
	if (!fs.existsSync(envFile)) {
		createEnvFile(envFile);
	}

	// build new docker image
	const dockerFile = 'src-database';
	await execute(`docker build -t snd-backoffice-db-dev:latest ${dockerFile}`);
	await execute('docker image prune --force');

	console.log('docker image built.');
}

function generateRandomString(length: number): string {
	return randomBytes(Math.ceil(length / 2))
		.toString('hex')
		.slice(0, length);
}

export async function createEnvFile(envFile: string) {
	fs.writeFileSync(
		envFile,
		`
		POSTGRES_DATABASE=postgres
		POSTGRES_HOST=localhost:5432
		POSTGRES_PASSWORD=${generateRandomString(12)}
		POSTGRES_USER=postgres
	`.replace(/^\s+/gm, '')
	);
}
