import { sql, sqlTables } from '$lib/server/database';
import { auth } from '$lib/server/authentication';
import { z } from 'zod';
import { NewRegistrationSchema, type ProviderNames } from '.';

export const NewUserSchema = NewRegistrationSchema.omit({
	password: true
});

export type NewUser = z.infer<typeof NewUserSchema>;

/**
 * Create backoffice user :
 * - create user with lucia
 * - create user profile
 */
export async function createUser(
	providerId: ProviderNames,
	{ email, firstname, lastname, phone }: NewUser
) {
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

	return userId;
}
