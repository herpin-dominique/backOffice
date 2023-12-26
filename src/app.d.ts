// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace Lucia {
		type Auth = import('$lib/server/authentication').Auth;
		type DatabaseUserAttributes = {
			create_at?: Date;
		};
		type DatabaseSessionAttributes = {};
	}

	namespace App {
		// interface Error {}
		interface Locals {
			auth: import('$lib/server/authentication').AuthRequest;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
