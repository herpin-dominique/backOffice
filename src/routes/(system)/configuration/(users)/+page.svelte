<script>
	import { ButtonGroup, Button } from 'flowbite-svelte';
	import { UserAddOutline } from 'flowbite-svelte-icons';
	import CreateUser from './CreateUser.svelte';
	import PopupMessage from './PopupMessage.svelte';
	import UserTable from './UserTable.svelte';
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

	<UserTable
		users={data.users}
		formData={data.userActionsForm}
		on:message={({ detail }) => {
			message = detail;
		}}
	/>
</div>

<CreateUser
	formData={{ ...data.createUserForm }}
	bind:open={createUserModal}
	on:message={({ detail }) => {
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
