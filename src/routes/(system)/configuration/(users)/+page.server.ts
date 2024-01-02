import { AuthError } from '$lib/server/authentication/lucia.js';
import {
	NewUserSchema,
	UserProfileSchema,
	createUser,
	deleteUser,
	listUser
} from '$lib/server/users';
import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';

const UserActionForm = UserProfileSchema.partial()
	.omit({
		id: true,
		createAt: true
	})
	.extend({
		email: UserProfileSchema.shape.email
	});

export async function load() {
	const createUserForm = await superValidate(NewUserSchema);
	const userActionsForm = await superValidate(UserActionForm);
	const users = await listUser('backoffice');

	return { createUserForm, userActionsForm, users };
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
	},

	'delete-user': async ({ request }) => {
		const form = await superValidate(request, UserActionForm);
		if (!form.valid) return fail(400, { deleteForm: form });

		await deleteUser('backoffice', form.data.email);

		return message(form, 'User deleted');
	}
};
