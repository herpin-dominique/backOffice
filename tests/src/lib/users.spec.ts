import { createUser, deleteUser, listUser, type NewUser } from '$lib/server/users';
import { randEmail, randFirstName, randLastName, randPhoneNumber } from '@ngneat/falso';

const randUser = (): NewUser => ({
	email: randEmail(),
	firstname: randFirstName(),
	lastname: randLastName(),
	phone: '+33 01 23 45 67 89'
});

describe('Users spec', () => {
	const user = randUser();

	it.sequential('should able to create a backoffice user', async () => {
		const userId = await createUser('backoffice', user);
		expect(userId).not.toBe('');
	});

	it.sequential('should able to list user', async () => {
		const users = await listUser('backoffice');
		expect(users).toContainMatchingObject(user);
	});

	it.sequential('should able to delete backoffice user', async () => {
		const result = await deleteUser('backoffice', user.email);
		expect(result).toBe(true);
	});
});
