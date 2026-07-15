import {defineConfig} from 'vite';

export default defineConfig({
	base: '/windows/',
	build: {
		chunkSizeWarningLimit: 2000,
	}
});

