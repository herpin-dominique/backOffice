<script lang="ts">
	import {
		ButtonGroup,
		Button,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import type { UserProfile } from '$lib/server/users';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { createEventDispatcher } from 'svelte';
	import { TrashBinOutline } from 'flowbite-svelte-icons';
	import UpdatableCell, { type UpdatableCellEvents } from './UpdatableCell.svelte';
	export let users: UserProfile[];
	export let formData: PageData['userActionsForm'];

	const dispatch = createEventDispatcher();

	// Superform setup
	const { form, enhance } = superForm(formData, {
		taintedMessage: null,
		resetForm: false,
		onUpdated: ({ form }) => {
			if (form.message !== undefined) dispatch('message', form.message);
		}
	});

	// update form data as hidden values
	type FormDataBase = Record<keyof typeof $form, any>;
	type FormData = Pick<FormDataBase, 'id'> & Partial<Omit<FormDataBase, 'id'>>;
	function setFormData(data: FormData) {
		$form = { ...data };
	}

	// update user data
	function updateUser(event: CustomEvent<UpdatableCellEvents['confirm']>) {
		setFormData({
			id: event.detail.id,
			[event.detail.property]: event.detail.value
		});

		console.log({ form: $form });
	}
</script>

{#if users.length > 0}
	<form method="post" use:enhance>
		<input type="hidden" name="id" bind:value={$form.id} />
		{#if $form.email}
			<input type="hidden" name="email" bind:value={$form.email} />
		{/if}
		{#if $form.firstname}
			<input type="hidden" name="firstname" bind:value={$form.firstname} />
		{/if}
		{#if $form.lastname}
			<input type="hidden" name="lastname" bind:value={$form.lastname} />
		{/if}
		{#if $form.phone}
			<input type="hidden" name="phone" bind:value={$form.phone} />
		{/if}

		<Table>
			<TableHead>
				<TableHeadCell>created at</TableHeadCell>
				<TableHeadCell>email</TableHeadCell>
				<TableHeadCell>firstname</TableHeadCell>
				<TableHeadCell>lastname</TableHeadCell>
				<TableHeadCell>phone</TableHeadCell>
				<TableHeadCell>
					<span class="sr-only">actions</span>
				</TableHeadCell>
			</TableHead>

			<TableBody tableBodyClass="divide-y">
				{#each users as user}
					<TableBodyRow>
						<TableBodyCell>{user.createAt.toDateString()}</TableBodyCell>
						<TableBodyCell>
							<UpdatableCell data={{ property: 'email', user }} on:confirm={updateUser} />
						</TableBodyCell>
						<TableBodyCell>
							<UpdatableCell data={{ property: 'firstname', user }} on:confirm={updateUser} />
						</TableBodyCell>
						<TableBodyCell>
							<UpdatableCell data={{ property: 'lastname', user }} on:confirm={updateUser} />
						</TableBodyCell>
						<TableBodyCell>
							<UpdatableCell data={{ property: 'phone', user }} on:confirm={updateUser} />
						</TableBodyCell>
						<TableBodyCell>
							<ButtonGroup>
								<Button
									outline
									color="dark"
									type="submit"
									formAction="?/delete-user"
									on:click={() => setFormData({ id: user.id, email: user.email })}
								>
									<TrashBinOutline class="me-2 h-3 w-3" v />
								</Button>
							</ButtonGroup>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</form>
{:else}
	<p class="self-center">no user</p>
{/if}
