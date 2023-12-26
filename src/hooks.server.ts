// src/hooks.server.ts
import { auth } from '$lib/server/authentication';
import { isInitialSetup } from '$lib/server/setup';
import { redirect, type Handle, error } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const pathname = event.url.pathname;

	if (isInitialSetup()) {
		if (pathname !== '/setup') return redirect(307, '/setup');
	} else {
		if (pathname === '/setup') return error(404, { message: 'not found' });
		// check and read session data
		event.locals.auth = auth.handleRequest(event);
	}
	return await resolve(event);
};
