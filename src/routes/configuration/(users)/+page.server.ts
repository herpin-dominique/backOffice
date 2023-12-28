import { NewRegistrationSchema } from '$lib/server/users';
import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';

const createUserSchema = NewRegistrationSchema.omit({
	password: true
});

export async function load() {
	const createUserForm = await superValidate(createUserSchema);

	return { createUserForm };
}

export const actions = {
	'create-user': async ({ request }) => {
		const createUserForm = await superValidate(request, createUserSchema);

		if (!createUserForm.valid) return fail(400, { loginForm: createUserForm });

		// TODO: Login user
		return message(createUserForm, 'Reset link sent to new user.');
	}
};
