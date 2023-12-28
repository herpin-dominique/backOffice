<script lang="ts">
	import { Button, Modal } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';

	export let open: boolean;
	export let message: string;
</script>

<Modal bind:open color="blue" size="md" autoclose on:close>
	<div class="text-center">
		<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{message}</h3>
		<Button color="red" class="me-2">Ok</Button>
	</div>
</Modal>
