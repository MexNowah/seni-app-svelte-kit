import { sveltekit } from '@sveltejs/kit/vite';

import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit()
	],
	ssr: {
		noExternal: ['chart.js/**']
	},
	define: {
		'process.env.NODE_ENV': process.env.NODE_ENV === 'production' 
		  ? '"production"'
		  : '"development"'
	}
});
