import { auth, AuthError, type Session } from '$lib/server/authentication/lucia.js';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const loginSchema = z
	.object({
		username: z.string().min(1),
		password: z.string().min(1),
		session: z.any().optional()
	})
	.transform(async ({ username, password }) => {
		let session = undefined;
		try {
			const key = await auth.useKey(
				username === 'root' ? 'system' : 'email',
				username.toLowerCase(),
				password
			);
			session = await auth.createSession({
				userId: key.userId,
				attributes: {}
			});
		} catch (e) {
			if (!(e instanceof AuthError && e.message.match(/AUTH_INVALID_KEY_ID|AUTH_INVALID_PASSWORD/)))
				console.error(e);
		}
		return { username, password, session };
	})
	.refine(({ session }) => session !== undefined, {
		message: 'username or passwords do not match',
		path: ['session']
	});

export async function load({ locals }) {
	const form = await superValidate(loginSchema);
	return { form };
}

export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, loginSchema);
		if (!form.valid || form.data.session === undefined) {
			return fail(400, { form });
		}
		await locals.auth.setSession(form.data.session as Session);
		return redirect(302, '/');
	}
};
