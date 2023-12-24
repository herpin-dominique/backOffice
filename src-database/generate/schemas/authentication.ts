/**
 * Authentication and User data
 */
import { resolveEnvTableName } from './resolver';

export const AuthenticationTables = {
	user: resolveEnvTableName('bo_user'),
	key: resolveEnvTableName('bo_user_key'),
	session: resolveEnvTableName('bo_user_session')
};

export function generateAuthentationDDL() {
	return `
        CREATE TABLE ${AuthenticationTables.user} (
            id TEXT NOT NULL PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            firstname TEXT NOT NULL,
            lastname TEXT NOT NULL,
            phone TEXT NOT NULL
        );

        CREATE TABLE ${AuthenticationTables.key} (
            id TEXT NOT NULL PRIMARY KEY,
            user_id TEXT NOT NULL REFERENCES ${AuthenticationTables.user}(id),
            hashed_password TEXT
        );
            
        CREATE TABLE ${AuthenticationTables.session} (
            id TEXT NOT NULL PRIMARY KEY,
            user_id TEXT NOT NULL REFERENCES ${AuthenticationTables.user}(id),
            active_expires BIGINT NOT NULL,
            idle_expires BIGINT NOT NULL
        );
    `;
}
