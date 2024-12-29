import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import adapter from '@sveltejs/adapter-node';


export default defineConfig({
	build: {
		outDir: 'dist',
	},
	kit: {
		adapter: adapter()
	},
	plugins: [sveltekit()]
});
