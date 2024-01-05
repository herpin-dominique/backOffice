<script>
	import '../app.pcss';
	import { page } from '$app/stores';
	import { DarkMode } from 'flowbite-svelte';
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Button,
		Dropdown,
		DropdownItem,
		DropdownDivider
	} from 'flowbite-svelte';
	import { UserOutline } from 'flowbite-svelte-icons';
	import Logout from './(authentication)/logout/Logout.svelte';
	import { goto } from '$app/navigation';
	export let data;

	$: username = data.session?.user.userId;
	$: if (data.session === null && $page.url.pathname !== '/login') goto('/login');
</script>

<Navbar fluid>
	<NavBrand href={data.session === null ? '/login' : '/'}>
		<img src="/logo.png" class="me-3 h-6 sm:h-9" alt="SND Logo" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
			>SND Backoffice</span
		>
	</NavBrand>
	<NavHamburger />
	<div class="flex items-center justify-evenly md:order-2">
		<DarkMode />
		<div>
			{#if !($page.url.pathname === '/setup' || data.session === null)}
				<Button outline color="alternative" class="ml-2 flex w-40 justify-between">
					<UserOutline />
					{username}
				</Button>
				<Dropdown class="w-40">
					<DropdownItem><a href="/profile">Profile</a></DropdownItem>
					<DropdownDivider />
					<DropdownItem><Logout /></DropdownItem>
				</Dropdown>
			{/if}
		</div>
	</div>
	{#if !($page.url.pathname === '/setup' || data.session === null)}
		<NavUl>
			<NavLi href="/">Dashboard</NavLi>

			<NavLi href="/orders">Orders</NavLi>
			<NavLi href="/products">Products</NavLi>
			<NavLi href="/destinations">Destinations</NavLi>

			<NavLi href="/blogs">Blogs</NavLi>
			<NavLi href="/newsletter">Newsletter</NavLi>
			<NavLi href="/contacts">Contacts</NavLi>

			<NavLi href="/configuration">Configuration</NavLi>
		</NavUl>
	{/if}
</Navbar>
<slot />
