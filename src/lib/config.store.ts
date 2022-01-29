import { writable } from 'svelte/store';
import WrapperCenter from '$lib/WrapperCenter.svelte';

const defaultWrappers = {
	center: WrapperCenter
};

const createConfig = () => {
	const { subscribe, update, set } = writable({
		viewerWidthPreset: [360, 480, 720, 800, 1200],
		getComponentName: (v) => v,
		wrappers: {}
	});

	const init = (nextConfig) =>
		update((config) => {
			const wrappers = {
				...defaultWrappers,
				...nextConfig.wrappers
			};

			return {
				...config,
				...nextConfig,
				wrappers
			};
		});

	return { subscribe, init, update, set };
};

export const state = writable({
	componentNames: [],
	currentComponentName: '',
});

export const componentData = writable({
	wrapperId: '',
	defaultProps: {},
});

if (typeof window !== 'undefined') {
	const listen = (e: MessageEvent) => {
		const { type, payload } = e.data;
		if (type === 'componentList') {
			state.update((prev) => {
				return {
					...prev,
					componentNames: payload
				};
			});
		}

		if (type === 'componentData') {
			componentData.update((prev) => {
				const { wrapperId, defaultProps } = payload
				return {
					...prev,
					wrapperId,
					defaultProps,
				}
			})
		}
	};

	window.onmessage = listen;
}

export const config = createConfig();

componentData.subscribe(v => console.log(v))