import { UserProfileSchema, type UserProfile, type ProviderNames } from '.';
import { sql, sqlTables } from '../database';

export async function listUser(providerId: ProviderNames) {
	const mask = `${providerId}:%`;
	return (
		await sql`select 
                    u.id, u.create_at as "createAt", p.email, p.firstname, p.lastname, p.phone
                from ${sqlTables.userProfile} p 
                    join ${sqlTables.key} k on p.user_id = k.user_id
                    join ${sqlTables.user} u on p.user_id = u.id
                where k.id like ${mask}`
	).map((row) => UserProfileSchema.parse(row));
}
