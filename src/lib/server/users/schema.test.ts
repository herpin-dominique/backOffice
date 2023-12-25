import { NewUserSchema, type NewUser } from './schema';

describe('User schema validation', () => {
	const validUser: NewUser = {
		email: 'toto@test.fr',
		password: '123Joh187',
		firstname: 'Totoro',
		lastname: 'ghibli',
		phone: '+33 0612345678'
	};

	it('should have no errors with valid data', () => {
		const validation = NewUserSchema.safeParse(validUser);
		expect(validation.success).toBe(true);
	});

	it('should have errors with invalid email data', () => {
		const validation = NewUserSchema.safeParse({ ...validUser, email: '' });
		expect(validation.success).toBe(false);

		// typescript discriminated union
		if (validation.success === false) {
			const flattenErrors = validation.error.flatten();
			expect(Object.keys(flattenErrors.fieldErrors).length).toBe(1);
			expect(flattenErrors.fieldErrors.email).toStrictEqual(['Invalid email']);
		}
	});

	it('should have error with invalid password complexity', () => {
		const validation = NewUserSchema.safeParse({ ...validUser, password: '' });
		expect(validation.success).toBe(false);

		// typescript discriminated union
		if (validation.success === false) {
			const flattenErrors = validation.error.flatten();
			expect(Object.keys(flattenErrors.fieldErrors).length).toBe(1);
			expect(flattenErrors.fieldErrors.password).toStrictEqual([
				'String must contain at least 8 character(s)',
				'a least 1 uppercase',
				'a least 1 lowercase',
				'a least 1 digit'
			]);
		}
	});

	it('should have errors with empty names', () => {
		const validation = NewUserSchema.safeParse({ ...validUser, firstname: '', lastname: '' });
		expect(validation.success).toBe(false);

		// typescript discriminated union
		if (validation.success === false) {
			const flattenErrors = validation.error.flatten();
			expect(Object.keys(flattenErrors.fieldErrors).length).toBe(2);
			expect(flattenErrors.fieldErrors.firstname).toStrictEqual([
				'String must contain at least 1 character(s)'
			]);
			expect(flattenErrors.fieldErrors.lastname).toStrictEqual([
				'String must contain at least 1 character(s)'
			]);
		}
	});
});
