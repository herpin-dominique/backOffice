import prettier from 'prettier';

const config = {
	plugins: ['prettier-plugin-sql'],
	parser: 'sql',
	useTabs: true,
	keywordCase: 'upper',
	identifierCase: 'lower'
};

export async function formatSQL(data: string) {
	try {
		return prettier.format(data, config);
	} catch (e) {
		console.error('Error formatting SQL file:', e);
	}
}
