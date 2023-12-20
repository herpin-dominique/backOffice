/**
 * Authentication and User data
 */

export function generateAuthentationDDL(prefix: string) {
	return `
        CREATE TABLE ${prefix}_user (
            id TEXT NOT NULL PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            firstname TEXT NOT NULL,
            lastname TEXT NOT NULL,
            phone TEXT NOT NULL
        );

        CREATE TABLE ${prefix}_user_key (
            id TEXT NOT NULL PRIMARY KEY,
            user_id TEXT NOT NULL REFERENCES ${prefix}_user(id),
            hashed_password TEXT
        );
            
        CREATE TABLE ${prefix}_user_session (
            id TEXT NOT NULL PRIMARY KEY,
            user_id TEXT NOT NULL REFERENCES ${prefix}_user(id),
            active_expires BIGINT NOT NULL,
            idle_expires BIGINT NOT NULL
        );
    `;
}
