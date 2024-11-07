// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { account, session } from "@prisma/client";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session?: session
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };
