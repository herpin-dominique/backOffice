import { AuthError } from '$lib/server/authentication/lucia.js';
import { NewUserSchema, createUser, listUser } from '$lib/server/users';
import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';

export async function load() {
	const createUserForm = await superValidate(NewUserSchema);
	const users = await listUser('backoffice');

	return { createUserForm, users };
}

export const actions = {
	'create-user': async ({ request }) => {
		const form = await superValidate(request, NewUserSchema);
		if (!form.valid) return fail(400, { createUserForm: form });

		try {
			await createUser('backoffice', form.data);
			return message(form, 'New user created.');
		} catch (e) {
			if (e instanceof AuthError && e.message === 'AUTH_DUPLICATE_KEY_ID') {
				return message(form, 'User already exist.');
			}
			console.error(e);
			return message(form, 'An error occured.');
		}
	}
};
