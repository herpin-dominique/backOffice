import { AuthError, auth } from '$lib/server/authentication';

let rootExist = false;

/**
 * Initial Setup Check done once when the server start
 */
try {
	await auth.getUser('root');
	rootExist = true;
} catch (e) {
	if (!(e instanceof AuthError && e.message === 'AUTH_INVALID_USER_ID')) {
		// show other errors
		console.error(e);
	}
}

export function isInitialSetup() {
	return !rootExist;
}

export async function createRootUser(password: string) {
	try {
		await auth.createUser({
			userId: 'root',
			key: {
				providerId: 'system',
				providerUserId: 'root',
				password
			},
			attributes: {}
		});
		rootExist = true;
	} catch (e) {
		console.error(e);
	}
}
