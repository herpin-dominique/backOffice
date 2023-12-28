<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import { Card, Input, Label, Button, Helper } from 'flowbite-svelte';
	import * as Icon from 'flowbite-svelte-icons';
	export let data;

	const { form, errors, enhance } = superForm(data.form);
</script>

<Card class="mx-auto mt-12" size="md">
	<h2 class="flex items-center justify-between">
		<Icon.GearSolid />
		Setup - initialization of root account
	</h2>

	<p class="mb-4 mt-4">
		This account holds the highest level of access and control over the system, making it essential
		to secure it with a strong password. This is crucial as the root user has unrestricted access
		and privileges, capable of making any changes to the system.
	</p>

	<form method="post" use:enhance>
		<Label for="password" class="mb-2">Password</Label>
		<Input
			type="password"
			id="password"
			name="password"
			placeholder="•••••••••"
			required
			bind:value={$form.password}
		/>
		<Helper class="mb-6 mt-2" color="red">
			{#if $errors.password}
				{$errors.password}
			{/if}
		</Helper>
		<Label for="confirm_password" class="mb-2">Confirm password</Label>
		<Input
			type="password"
			id="confirm_password"
			name="confirm_password"
			placeholder="•••••••••"
			required
			bind:value={$form.confirm_password}
		/>
		<Helper class="mb-6 mt-2" color="red">
			{#if $errors.confirm_password}
				{$errors.confirm_password}
			{/if}
		</Helper>
		<Button type="submit">Submit</Button>
	</form>
</Card>
