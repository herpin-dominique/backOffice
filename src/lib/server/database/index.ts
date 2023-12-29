import type { Helper } from 'postgres';
import { sql, TABLES } from '.';

type SQL_TABLE = Helper<string, []>;

export const sqlTables = Object.entries({
	...TABLES
})
	.map(([key, value]) => ({ [key]: sql(value) }))
	.reduce((acc, obj) => ({ ...acc, ...obj }), {}) as { [P in keyof typeof TABLES]: SQL_TABLE };

export * from './connection';
export * from '../../../../src-database/generate/schemas';
