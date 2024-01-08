import { sql, sqlTables } from '$lib/server/database';
import { auth } from '$lib/server/authentication';
import type { NewUser, ProviderNames } from '.';

/**
 * Create backoffice user :
 * - create user with lucia
 * - create user profile
 */
export async function createUser(
	providerId: ProviderNames,
	{ email, firstname, lastname, phone, password }: NewUser
) {
	const { userId } = await auth.createUser({
		key: {
			providerId,
			providerUserId: email.toLowerCase(),
			password: password || null
		},
		attributes: {}
	});
	await sql`INSERT INTO ${sqlTables.userProfile} (email, firstname, lastname, phone, user_id)
                  VALUES (${email}, ${firstname}, ${lastname}, ${phone}, ${userId})`;

	return userId;
}
