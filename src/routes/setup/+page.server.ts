import { createRootUser } from '$lib/server/setup/index.js';
import { passwordValidation } from '$lib/server/users';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const newPasswordSchema = z
	.object({
		password: z.string().superRefine(passwordValidation),
		confirm_password: z.string()
	})
	.refine((data) => data.password === data.confirm_password, {
		message: 'Passwords do not match',
		path: ['confirm_password']
	});

export async function load() {
	const form = await superValidate(newPasswordSchema);
	return { form };
}

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, newPasswordSchema);
		if (!form.valid) {
			console.error(form);

			return fail(400, { form });
		}

		await createRootUser(form.data.password);

		return redirect(302, '/login');
	}
};
