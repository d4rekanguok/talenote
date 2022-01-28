import { writable, derived } from 'svelte/store';
import WrapperCenter from '~/components/WrapperCenter.svelte';

const defaultWrappers = {
	center: WrapperCenter
};

const createConfig = (state) => {
	const { subscribe, update } = writable({
		modules: {},
		componentNames: [],
		viewerWidthPreset: [360, 480, 720, 800, 1200],
		getComponentName: (v) => v,
		wrappers: {}
	});

	const init = (nextConfig) =>
		update((config) => {
			const componentNames = Object.keys(nextConfig.modules);
			const wrappers = {
				...defaultWrappers,
				...nextConfig.wrappers
			};

			state.update((state) => {
				return {
					...state,
					currentComponentName: componentNames[0]
				};
			});

			return {
				...config,
				...nextConfig,
				componentNames,
				wrappers
			};
		});

	return { subscribe, init };
};

export const state = writable({
	currentComponentName: ''
});
export const config = createConfig(state);

const defaultComponentStore = {
	Component: null,
	defaultProps: {},
	wrapperId: ''
};
export const componentStore = derived(
	[state, config],
	([{ currentComponentName }, { modules }]) => {
		if (!currentComponentName || Object.keys(modules).length === 0) {
			return defaultComponentStore;
		}
		const imported = modules[currentComponentName];
		return {
			Component: imported.default,
			defaultProps: imported.defaultProps || {},
			wrapperId: imported.taleWrapper || ''
		};
	},
	defaultComponentStore
);
