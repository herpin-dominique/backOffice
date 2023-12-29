import { sql, sqlTables } from '$lib/server/database';
import { auth } from '$lib/server/authentication';
import { z } from 'zod';
import { NewRegistrationSchema } from '.';

export const NewBackofficeUserSchema = NewRegistrationSchema.omit({
	password: true
});

export type NewBackofficeUser = z.infer<typeof NewBackofficeUserSchema>;

/**
 * Create backoffice user :
 * - create user with lucia
 * - create user profile
 */
export async function createBackofficeUser({
	email,
	firstname,
	lastname,
	phone
}: NewBackofficeUser) {
	const { userId } = await auth.createUser({
		key: {
			providerId: 'backoffice',
			providerUserId: email.toLowerCase(),
			password: null
		},
		attributes: {}
	});
	await sql`INSERT INTO ${sqlTables.userProfile} (email, firstname, lastname, phone, user_id)
                  VALUES (${email}, ${firstname}, ${lastname}, ${phone}, ${userId})`;
}
