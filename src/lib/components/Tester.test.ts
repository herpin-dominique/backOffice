import { render, fireEvent, screen } from '@testing-library/svelte';

import Comp from './Tester.svelte';

describe('', () => {
	it('shows proper heading when rendered', () => {
		render(Comp, { name: 'World' });
		const heading = screen.getByText('Hello World!');

		expect(heading).toBeInTheDocument();
	});

	it('changes button text on click', async () => {
		render(Comp, { name: 'World' });
		const button = screen.getByRole('button');
		await fireEvent.click(button);

		expect(button).toHaveTextContent('Button Clicked');
	});
});
