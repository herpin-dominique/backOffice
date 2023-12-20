import { exec } from 'child_process';

export async function buildImage() {
	// build new docker image
	const dockerFile = 'src-database';
	exec(`docker build -t snd-backoffice-db-dev:latest ${dockerFile}`, (error, stdout, stderr) => {
		console.log(stdout);
		if (error) console.error(stderr);
	});
}
