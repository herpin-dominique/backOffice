/**
 * Authentication and User data
 */

import { resolveEnvTableName } from '.';

export function generateAuthentationDDL() {
	return `
        CREATE TABLE ${resolveEnvTableName('bo_user')} (
            id TEXT NOT NULL PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            firstname TEXT NOT NULL,
            lastname TEXT NOT NULL,
            phone TEXT NOT NULL
        );

        CREATE TABLE ${resolveEnvTableName('bo_user_key')} (
            id TEXT NOT NULL PRIMARY KEY,
            user_id TEXT NOT NULL REFERENCES ${resolveEnvTableName('bo_user')}(id),
            hashed_password TEXT
        );
            
        CREATE TABLE ${resolveEnvTableName('bo_user_session')} (
            id TEXT NOT NULL PRIMARY KEY,
            user_id TEXT NOT NULL REFERENCES ${resolveEnvTableName('bo_user')}(id),
            active_expires BIGINT NOT NULL,
            idle_expires BIGINT NOT NULL
        );
    `;
}
