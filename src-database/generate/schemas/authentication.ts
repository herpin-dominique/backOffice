/**
 * Authentication data
 *
 * bo_user table is the account used for login
 * bo_user_key table hold the user credential
 * bo_user_session is for storing session data
 *
 * NB: this model is from lucia-auth
 *
 */
import { resolveEnvTableName } from './resolver';

export const AuthenticationTables = {
	user: resolveEnvTableName('bo_user'),
	key: resolveEnvTableName('bo_user_key'),
	session: resolveEnvTableName('bo_user_session')
};

export function generateAuthentationTablesDDL() {
	return `
        CREATE TABLE ${AuthenticationTables.user} (
            id TEXT NOT NULL PRIMARY KEY,
            create_at DATE NOT NULL DEFAULT CURRENT_DATE
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
