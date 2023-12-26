<script>
	import '../app.pcss';
	import { page } from '$app/stores';
	import { DarkMode } from 'flowbite-svelte';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
</script>

<Navbar>
	<NavBrand href="/">
		<img src="/logo.png" class="me-3 h-6 sm:h-9" alt="SND Logo" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
			>SND Backoffice</span
		>
	</NavBrand>
	<NavHamburger />
	{#if $page.url.pathname !== '/setup'}
		<NavUl>
			<NavLi href="/">Dashboard</NavLi>

			<NavLi href="/tbd">Orders</NavLi>
			<NavLi href="/tbd">Products</NavLi>
			<NavLi href="/tbd">Destinations</NavLi>

			<NavLi href="/tbd">Blogs</NavLi>
			<NavLi href="/tbd">Newsletters</NavLi>
			<NavLi href="/tbd">Contacts</NavLi>

			<NavLi href="/tbd">Configuration</NavLi>
		</NavUl>
	{/if}
	<DarkMode />
</Navbar>
<slot />
