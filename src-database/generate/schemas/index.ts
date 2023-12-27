import { generateAuthentationTablesDDL } from '.';
import { generateUserTablesDDL } from '.';
import { UserTables } from '.';
import { AuthenticationTables } from '.';

export const TABLES = {
	...AuthenticationTables,
	...UserTables
};

export const DDL = [
	{
		name: 'authentication',
		generate: generateAuthentationTablesDDL
	},
	{
		name: 'user',
		generate: generateUserTablesDDL
	}
];

export * from './authentication';
export * from './users';
