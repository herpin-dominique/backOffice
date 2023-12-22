import { sql } from '$lib/server/database/connection';

describe('connectiity spec', () => {
	it('should able to select text value', async () => {
		const [row] = await sql`select 'hello' as message`;
		expect(row.message).toBe('hello');
	});
});
