import { sql, sqlTables } from '$lib/server/database';
import type { UserProfile } from '.';
import _ from 'lodash';

export type UpdateUserProfile = Pick<UserProfile, 'id'> & Partial<Omit<UserProfile, 'id'>>;
export type UserProfileKey = keyof Omit<UserProfile, 'id' | 'createAt'> | 'user_id';

/**
 * Create backoffice user :
 * - create user with lucia
 * - create user profile
 */
export async function updateUser(profile: UpdateUserProfile) {
	const cleanProfile = _.omitBy(profile, _.isUndefined);
	const keys = Object.keys(cleanProfile).filter(
		(value) => !value.match(/id|createAt/)
	) as UserProfileKey[];

	const update = sql(cleanProfile, ...keys);

	await sql`update ${sqlTables.userProfile} set ${update}
        where user_id = ${cleanProfile.id}
    `;
}
