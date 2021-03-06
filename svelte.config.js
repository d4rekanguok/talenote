import path from 'path';
import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
			resolve: {
				alias: {
					'~': path.resolve('./src')
				}
			}
		},
		package: {
			exports: (filepath) => {
				return filepath.includes('index.ts');
			}
		},
		routes: (filepath) => {
			return process.env.NODE_ENV === 'production' ? !filepath.includes('talenote') : true;
		}
	}
};

export default config;
