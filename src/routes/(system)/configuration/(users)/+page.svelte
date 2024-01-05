<script>
	import DeleteButton from './DeleteButton.svelte';
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
	import { UserAddOutline, TrashBinOutline } from 'flowbite-svelte-icons';
	import CreateForm from './CreateForm.svelte';
	import PopupMessage from './PopupMessage.svelte';
	export let data;

	let createUserModal = false;
	let message = '';
</script>

<div class="mt-4 flex w-full flex-col">
	<ButtonGroup class="mb-6 mr-4 self-end">
		<Button on:click={() => (createUserModal = true)} outline color="dark">
			<UserAddOutline class="me-2 h-3 w-3" />
			Add
		</Button>
	</ButtonGroup>

	{#if data.users.length > 0}
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
				{#each data.users as user}
					<TableBodyRow>
						<TableBodyCell>{user.createAt.toDateString()}</TableBodyCell>
						<TableBodyCell>{user.email}</TableBodyCell>
						<TableBodyCell>{user.firstname}</TableBodyCell>
						<TableBodyCell>{user.lastname}</TableBodyCell>
						<TableBodyCell>{user.phone}</TableBodyCell>
						<TableBodyCell>
							<ButtonGroup>
								<DeleteButton {user} formData={data.userActionsForm} />
							</ButtonGroup>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	{:else}
		<p class="self-center">no user</p>
	{/if}
</div>

<CreateForm
	formData={data.createUserForm}
	bind:open={createUserModal}
	on:updated={({ detail }) => {
		message = detail;
	}}
/>

<PopupMessage
	{message}
	open={message != ''}
	on:close={() => {
		createUserModal = false;
		message = '';
	}}
/>
