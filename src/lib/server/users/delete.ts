import type { ProviderNames } from '.';
import { auth } from '../authentication';

export async function deleteUser(providerId: ProviderNames, username: string) {
	try {
		const key = await auth.getKey(providerId, username);
		await auth.deleteUser(key.userId);
	} catch (e) {
		console.error(e);
		return false;
	}
	return true;
}
