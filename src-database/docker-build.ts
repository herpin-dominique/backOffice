import { exec } from 'child_process';
import { randomBytes } from 'crypto';
import fs from 'fs';

export async function buildImage() {
	const envFile = '.env.development.local';
	if (!fs.existsSync(envFile)) {
		createEnvFile(envFile);
	}

	// build new docker image
	const dockerFile = 'src-database';
	exec(`docker build -t snd-backoffice-db-dev:latest ${dockerFile}`, (error, stdout, stderr) => {
		console.log(stdout);
		if (error) console.error(stderr);
	});

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
