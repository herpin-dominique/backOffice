import { z } from 'zod';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export type ProviderNames = 'backoffice' | 'vitrine';

const parseDate = (value: unknown) => {
	if (!(typeof value === 'string' || value instanceof Date)) return undefined;
	const date = new Date(value);

	if (isNaN(date.getTime())) return undefined; // value is invalid
	// Reset time to 00:00:00
	date.setHours(0, 0, 0, 0);
	return date;
};

export const passwordValidation = (password: string, context: z.RefinementCtx) => {
	if (!/[A-Z]/.test(password)) context.addIssue({ code: 'custom', message: 'a least 1 uppercase' });
	if (!/[a-z]/.test(password)) context.addIssue({ code: 'custom', message: 'a least 1 lowercase' });
	if (!/[0-9]/.test(password)) context.addIssue({ code: 'custom', message: 'a least 1 digit' });
};

export const UserProfileSchema = z.object({
	id: z.string().min(15),
	createAt: z.preprocess(parseDate, z.date()),
	email: z.string().email(),
	firstname: z.string().min(1),
	lastname: z.string().min(1),
	phone: z.string().refine((value) => parsePhoneNumberFromString(value)?.isValid(), {
		message: 'invalid phone number'
	})
});

export const NewUserSchema = UserProfileSchema.omit({
	id: true,
	createAt: true
}).extend({
	password: z.union([z.null(), z.string().min(8).superRefine(passwordValidation)]).optional()
});

export const UpdateUserProfileSchema = UserProfileSchema.omit({
	id: true
}).partial();

export type NewUser = z.infer<typeof NewUserSchema>;

export type UpdateUserProfile = z.infer<typeof UpdateUserProfileSchema>;

export type UserProfile = z.infer<typeof UserProfileSchema>;
