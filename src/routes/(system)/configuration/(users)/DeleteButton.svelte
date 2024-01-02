<script lang="ts">
	import type { UserProfile } from '$lib/server/users';
	import { Button } from 'flowbite-svelte';
	import { TrashBinOutline } from 'flowbite-svelte-icons';
	import { stringProxy, superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';

	export let formData: PageData['userActionsForm'];
	export let user: UserProfile;

	let formElement: HTMLFormElement;
	const { form, message, enhance } = superForm(formData, {
		taintedMessage: null
	});

	const email = stringProxy(form, 'email', { empty: 'undefined' });
	$email = user.email;
</script>

<Button type="submit" outline color="dark" on:click={() => formElement.requestSubmit()}>
	<form bind:this={formElement} method="post" action="?/delete-user" use:enhance>
		<input type="hidden" name="email" bind:value={$email} />
		<TrashBinOutline class="me-2 h-3 w-3" />
	</form>
</Button>
