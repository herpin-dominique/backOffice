import { UserProfileSchema, type UserProfile } from '.';
import { sql, sqlTables } from '../database';

export async function listBackofficeUser() {
	return (
		await sql`select 
                    u.id, u.create_at as "createAt", p.email, p.firstname, p.lastname, p.phone
                from ${sqlTables.userProfile} p 
                    join ${sqlTables.key} k on p.user_id = k.user_id
                    join ${sqlTables.user} u on p.user_id = u.id
                where k.id like 'backoffice:%'`
	).map((row) => UserProfileSchema.parse(row));
}

// {
//     id: 'wxx6pkqgi7rzg1u',
//     createAt: 2023-12-29T00:00:00.000Z,
//     email: 'conanjahh@hotmail.com',
//     firstname: 'Johan',
//     lastname: 'CHAN',
//     phone: '+33 06 30 30 31 80'
//   },
