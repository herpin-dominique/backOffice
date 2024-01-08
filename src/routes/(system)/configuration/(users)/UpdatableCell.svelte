<script context="module" lang="ts">
	import type { UserProfile } from '$lib/server/users';

	export type EditableUserProperty = Exclude<keyof UserProfile, 'id' | 'createAt'>;

	export type UpdatableCellEvents = {
		confirm: {
			property: EditableUserProperty;
			id: string;
			value: string;
			source: HTMLElement | null;
		};
	};
</script>

<script lang="ts">
	import { Button, Input } from 'flowbite-svelte';
	import { CheckSolid, CloseSolid } from 'flowbite-svelte-icons';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher<UpdatableCellEvents>();

	export let data: {
		property: EditableUserProperty;
		user: UserProfile;
	};

	let value = data.user[data.property];
	let editing = false;

	function edit() {
		editing = true;
	}
	function cancel() {
		editing = false;
	}

	function confirm(event: MouseEvent | KeyboardEvent) {
		if (event instanceof KeyboardEvent) {
			if (event.key === 'Enter') {
				event.preventDefault();
			}
			return;
		}

		editing = false;
		dispatch('confirm', {
			property: data.property,
			id: data.user.id,
			value,
			source: event.target as HTMLElement | null
		});
	}
</script>

<div class="flex justify-end" tabindex="0" role="cell" on:dblclick={edit}>
	<Input
		type="text"
		class={editing ? 'mr-auto h-7 w-64' : 'hidden'}
		bind:value
		formAction="?/update-user"
		on:keypress={confirm}
	/>
	<span class={editing ? 'hidden' : 'mr-auto h-7 w-64'}>{value}</span>
	<Button
		aria-label="confirm"
		class={editing ? 'ml-2' : 'ml-2 hidden'}
		outline
		color="green"
		size="xs"
		type="submit"
		formAction="?/update-user"
		on:click={confirm}
	>
		<CheckSolid size="xs" />
	</Button>
	<Button
		class={editing ? 'ml-2' : 'ml-2 hidden'}
		aria-label="cancel"
		outline
		color="red"
		size="xs"
		on:click={cancel}
	>
		<CloseSolid size="xs" />
	</Button>
</div>
