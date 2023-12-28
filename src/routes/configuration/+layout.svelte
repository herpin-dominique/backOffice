<script>
	import { page } from '$app/stores';
	import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
	import { UsersOutline, UserSettingsOutline } from 'flowbite-svelte-icons';

	$: activeUrl = $page.url.pathname;
</script>

<div class="fluid flex">
	<Sidebar {activeUrl}>
		<SidebarWrapper>
			<SidebarGroup>
				<SidebarItem label="Users" href="/configuration">
					<svelte:fragment slot="icon">
						<UsersOutline
							class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
						/>
					</svelte:fragment>
				</SidebarItem>
			</SidebarGroup>
			<SidebarGroup>
				<SidebarItem label="Access rigths" href="/configuration/access-rights">
					<svelte:fragment slot="icon">
						<UserSettingsOutline
							class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
						/>
					</svelte:fragment>
				</SidebarItem>
			</SidebarGroup>
		</SidebarWrapper>
	</Sidebar>

	<slot />
</div>
