<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import { Card, Input, Label, Button, Helper } from 'flowbite-svelte';
	import * as Icon from 'flowbite-svelte-icons';
	export let data;

	const { form, errors, enhance } = superForm(data.form);
	$: console.log($errors.session);
</script>

<Card class="mx-auto mt-12" size="md">
	<div class="mb-6 flex items-center justify-between">
		<Icon.UserOutline />
		<p>Login</p>
	</div>

	<form method="post" use:enhance>
		<Label for="username" class="mb-2">Username</Label>
		<Input type="text" id="username" name="username" required bind:value={$form.username} />
		<Label for="password" class="mb-2 mt-6">password</Label>
		<Input
			type="password"
			id="password"
			name="password"
			placeholder="•••••••••"
			required
			bind:value={$form.password}
		/>
		<Helper class="mb-6 mt-2" color="red">
			{#if $errors.session}
				{$errors.session}
			{/if}
		</Helper>
		<Button class="mr-auto" type="submit">Log in</Button>
	</form>
</Card>
