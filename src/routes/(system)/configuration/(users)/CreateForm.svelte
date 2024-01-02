<script lang="ts">
	import { Button, Modal, Label, Input, Helper } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';

	export let formData: PageData['createUserForm'];
	export let open: boolean;

	const dispatch = createEventDispatcher();

	const { form, errors, enhance } = superForm(formData, {
		taintedMessage: null,
		resetForm: true,
		onUpdated: ({ form }) => {
			if (form.message !== undefined) dispatch('updated', form.message);
		}
	});
</script>

<Modal bind:open size="xs" color="form" autoclose={false} class="w-full">
	<form class="flex flex-col space-y-6" method="post" use:enhance>
		<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add new backoffice user</h3>
		<Label class="space-y-2">
			<span>Email</span>
			<Input type="email" name="email" bind:value={$form.email} />
			<Helper class="mb-6 mt-2" color="red">
				{#if $errors.email}
					{$errors.email}
				{/if}
			</Helper>
		</Label>
		<Label class="space-y-2">
			<span>Firstname</span>
			<Input type="text" name="firstname" bind:value={$form.firstname} />
			<Helper class="mb-6 mt-2" color="red">
				{#if $errors.firstname}
					{$errors.firstname}
				{/if}
			</Helper>
		</Label>
		<Label class="space-y-2">
			<span>Lastname</span>
			<Input type="text" name="lastname" bind:value={$form.lastname} />
			<Helper class="mb-6 mt-2" color="red">
				{#if $errors.lastname}
					{$errors.lastname}
				{/if}
			</Helper>
		</Label>
		<Label class="space-y-2">
			<span>Phone number</span>
			<Input type="text" name="phone" bind:value={$form.phone} />
			<Helper class="mb-6 mt-2" color="red">
				{#if $errors.phone}
					{$errors.phone}
				{/if}
			</Helper>
		</Label>

		<Button type="submit" class="w-full1" formaction="?/create-user">Create</Button>
	</form>
</Modal>
