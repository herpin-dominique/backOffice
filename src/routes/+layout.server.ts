export async function load({ locals, depends }) {
	depends('root-layout');
	const { session } = locals;

	return { session };
}
