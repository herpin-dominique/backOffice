<script>
	import { page } from '$app/stores';
	import { Card } from 'flowbite-svelte';
</script>

<Card size="xl" class="mx-auto mt-6">
	<h1>Page en construction.</h1>
	<p>{$page.url.pathname}</p>
</Card>
