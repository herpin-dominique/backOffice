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
	export let users: UserProfile[];
	export let formData: PageData['userActionsForm'];

	const dispatch = createEventDispatcher();

	const { form, errors, enhance } = superForm(formData, {
		taintedMessage: null,
		resetForm: true,
		onUpdated: ({ form }) => {
			if (form.message !== undefined) dispatch('message', form.message);
		}
	});

	function setEmail(value: string) {
		return () => {
			$form.email = value;
		};
	}
</script>

{#if users.length > 0}
	<form method="post" use:enhance>
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
						<TableBodyCell>{user.email}</TableBodyCell>
						<TableBodyCell>{user.firstname}</TableBodyCell>
						<TableBodyCell>{user.lastname}</TableBodyCell>
						<TableBodyCell>{user.phone}</TableBodyCell>
						<TableBodyCell>
							<input type="hidden" name="email" bind:value={$form.email} />
							<ButtonGroup>
								<Button
									outline
									color="dark"
									type="submit"
									formAction="?/delete-user"
									on:click={setEmail(user.email)}
								>
									<TrashBinOutline class="me-2 h-3 w-3" />
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
