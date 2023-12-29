import { sql } from '$lib/server/database';

describe('connectivity spec', () => {
	it('should able to select text value', async () => {
		const [row] = await sql`select 'hello' as message`;
		expect(row.message).toBe('hello');
	});

	it('should able to have parameter', async () => {
		const [row] = await sql`select ${'hello'} as message`;
		expect(row.message).toBe('hello');
	});

	it('should able to have table name as parameter', async () => {
		const rows = await sql`select tablename from ${sql(
			'pg_catalog.pg_tables'
		)} where schemaname = ${'public'}`;

		expect(rows).toContainEqual({ tablename: 'dev_bo_user' });
		expect(rows).toContainEqual({ tablename: 'dev_bo_user_key' });
		expect(rows).toContainEqual({ tablename: 'dev_bo_user_session' });
	});
});
