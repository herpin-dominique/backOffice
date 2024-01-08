import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { pick } from 'lodash';

import Cell, { type EditableUserProperty } from './UpdatableCell.svelte';
import type { UserProfile } from '$lib/server/users';

describe('editable cell', () => {
	const data = {
		property: 'firstname' as EditableUserProperty,
		user: {
			id: 'id',
			createAt: new Date(),
			email: '',
			firstname: 'foo',
			lastname: '',
			phone: ''
		} as UserProfile
	};

	it('should show cell value', () => {
		render(Cell, { data });
		const cell = screen.getByText(/foo/);
		expect(cell).toBeInTheDocument();
	});

	it('should not have button for confirmation or cancellation', async () => {
		render(Cell, { data });

		const confirmButton = screen.queryByLabelText('confirm');
		const cancelButton = screen.queryByLabelText('confirm');

		expect(confirmButton).toHaveClass('hidden');
		expect(cancelButton).toHaveClass('hidden');
	});

	it('should have button after double click on the value', async () => {
		render(Cell, { data });
		const cell = screen.getByText(/foo/);
		await userEvent.dblClick(cell);

		const confirmButton = screen.queryByLabelText('confirm');
		const cancelButton = screen.queryByLabelText('confirm');

		expect(confirmButton).not.toHaveClass('hidden');
		expect(cancelButton).not.toHaveClass('hidden');
	});

	it('should hide buttons after cancellation', async () => {
		render(Cell, { data });
		const cell = screen.getByText(/foo/);
		await userEvent.dblClick(cell);

		const confirmButton = screen.getByLabelText('confirm');
		const cancelButton = screen.getByLabelText('cancel');

		await userEvent.click(cancelButton);

		expect(confirmButton).toHaveClass('hidden');
		expect(cancelButton).toHaveClass('hidden');
	});

	it('should have a confirm event after clicking confirmation', async () => {
		const confirm = vi.fn((event) => event.detail);
		const { component } = render(Cell, { data });
		component.$on('confirm', confirm);

		const cell = screen.getByText(/foo/);
		await userEvent.dblClick(cell);

		const input = screen.getByRole('textbox') as HTMLInputElement;
		expect(input.value).toBe('foo');

		await userEvent.type(input, 'bar');
		expect(input.value).toBe('foobar');

		const confirmButton = screen.getByLabelText('confirm');
		await userEvent.click(confirmButton);

		expect(confirm).toHaveBeenCalledOnce();
		expect(confirm).toHaveReturnedWith({
			id: data.user.id,
			property: data.property,
			value: 'foobar',
			source: confirmButton
		});
	});
	/*
	it('should have a confirm event after pressing enter in the input', async () => {
		const confirm = vi.fn((event) => event.detail);
		const { component } = render(Cell, { data });
		component.$on('confirm', confirm);

		const cell = screen.getByText(/foo/);
		await userEvent.dblClick(cell);

		const input = screen.getByRole('textbox') as HTMLInputElement;
		expect(input.value).toBe('foo');

		await userEvent.type(input, 'bar');
		expect(input.value).toBe('foobar');

		await userEvent.type(input, '{enter}');

		expect(confirm).toHaveBeenCalledOnce();
		expect(confirm).toHaveReturnedWith({
			id: data.user.id,
			property: data.property,
			value: 'foobar',
			source: input
		});
	});
	*/
});
