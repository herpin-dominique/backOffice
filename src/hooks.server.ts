// src/hooks.server.ts
import { auth } from '$lib/server/authentication';
import { isInitialSetup } from '$lib/server/setup';
import { redirect, type Handle, error } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const pathname = event.url.pathname;

	if (isInitialSetup()) {
		// if not already configure redirect to /setup page
		if (pathname !== '/setup') return redirect(307, '/setup');
	} else {
		// disable /setup page
		if (pathname === '/setup') return error(404, { message: 'not found' });

		// check and read session data
		event.locals.auth = auth.handleRequest(event);
		event.locals.session = await event.locals.auth.validate();

		if (event.locals.session === null && pathname !== '/login') throw redirect(302, '/login'); // if not logged in redirect to /login
		if (event.locals.session !== null && pathname === '/login') throw redirect(302, '/'); // if already logged in and is opening /login page redirecto to /
	}
	return await resolve(event);
};
