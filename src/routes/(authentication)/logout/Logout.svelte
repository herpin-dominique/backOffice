<script>
	import { applyAction, enhance } from '$app/forms';
	import { navigating } from '$app/stores';
	export let form;
	let submiting = false;
</script>

<form
	method="post"
	action="/logout"
	use:enhance={() => {
		submiting = true;

		return async ({ result }) => {
			submiting = false;
			await applyAction(result);
		};
	}}
>
	<input
		type="submit"
		disabled={submiting || $navigating != null}
		value={submiting || $navigating != null ? 'logging out ...' : 'log out'}
	/>
</form>
