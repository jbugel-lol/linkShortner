// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { url, visit } from "@prisma/client";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session?: session & { account: account };
		}
		// interface PageData {}
		interface PageState {
			link: url & {
				visits: visit[]
			}
		}
		// interface Platform {}
	}
}

export { };
