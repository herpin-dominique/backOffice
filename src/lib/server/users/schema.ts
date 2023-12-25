import { z } from 'zod';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const UserSchema = z.object({
	id: z.string().min(15),
	email: z.string().email(),
	firstname: z.string().min(1),
	lastname: z.string().min(1),
	phone: z.string().refine((value) => parsePhoneNumberFromString(value)?.isValid(), {
		message: 'invalid phone number'
	})
});

export const NewUserSchema = UserSchema.omit({
	id: true
}).extend({
	password: z
		.string()
		.min(8)
		.superRefine((password, context) => {
			if (!/[A-Z]/.test(password))
				context.addIssue({ code: 'custom', message: 'a least 1 uppercase' });
			if (!/[a-z]/.test(password))
				context.addIssue({ code: 'custom', message: 'a least 1 lowercase' });
			if (!/[0-9]/.test(password)) context.addIssue({ code: 'custom', message: 'a least 1 digit' });
		})
});

export type NewUser = z.infer<typeof NewUserSchema>;

export type User = z.infer<typeof UserSchema>;
