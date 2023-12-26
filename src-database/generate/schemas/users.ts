/**
 * User specific data
 *
 * bo_user_profile hold optional private information on a person
 *
 */
import { AuthenticationTables } from '.';
import { resolveEnvTableName } from './resolver';

export const UserTables = {
	userProfile: resolveEnvTableName('bo_user_profile')
};

export function generateUserTablesDDL() {
	return `
        CREATE TABLE ${UserTables.userProfile} (
            id TEXT NOT NULL PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            firstname TEXT NOT NULL,
            lastname TEXT NOT NULL,
            phone TEXT NOT NULL,
            user_id TEXT NOT NULL REFERENCES ${AuthenticationTables.user}(id)
        );
    `;
}
