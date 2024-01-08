import { AuthError } from '$lib/server/authentication/lucia.js';
import {
	NewUserSchema,
	UserProfileSchema,
	createUser,
	deleteUser,
	listUser
} from '$lib/server/users';
import { updateUser } from '$lib/server/users/update.js';
import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';

const UserActionForm = UserProfileSchema.partial()
	.omit({
		createAt: true
	})
	.extend({
		id: UserProfileSchema.shape.id
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
			await createUser('backoffice', { ...form.data, password: null });
			return message(form, `User "${form.data.email}" created.`);
		} catch (e) {
			if (e instanceof AuthError && e.message === 'AUTH_DUPLICATE_KEY_ID') {
				return message(form, `User "${form.data.email}" already exist.`);
			}
			console.error(e);
			return message(form, 'An error occured.');
		}
	},
	'delete-user': async ({ request }) => {
		const form = await superValidate(request, UserActionForm.required({ email: true }));
		if (!form.valid) return fail(400, { deleteForm: form });

		await deleteUser('backoffice', form.data.email);
		console.log({ delete: form.data.email });

		return message(form, `User with email "${form.data.email}" deleted`);
	},
	'update-user': async ({ request }) => {
		const form = await superValidate(request, UserActionForm);
		if (!form.valid) return fail(400, { updateForm: form });

		await updateUser(form.data);

		return { form };
	}
};
