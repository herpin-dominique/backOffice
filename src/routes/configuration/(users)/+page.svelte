<script>
	import { ButtonGroup, Button, Modal, Label, Input, Helper } from 'flowbite-svelte';
	import { UserAddOutline } from 'flowbite-svelte-icons';
	import CreateUserForm from './CreateUserForm.svelte';
	import PopupMessage from './PopupMessage.svelte';
	export let data;

	let createUserModal = false;
	let message = '';
</script>

<div class="mt-4 flex w-full flex-col">
	<ButtonGroup class="mr-4 self-end">
		<Button on:click={() => (createUserModal = true)} outline color="dark">
			<UserAddOutline class="me-2 h-3 w-3" />
			Add
		</Button>
	</ButtonGroup>
</div>

<CreateUserForm
	formData={data.createUserForm}
	open={createUserModal}
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
