import { writable } from 'svelte/store';

export const state = writable({
	componentNames: [],
	currentComponentName: '',
});

let unsubscribe = () => null;
unsubscribe = state.subscribe((_state) => {
	if (_state.currentComponentName === '' && _state.componentNames.length > 0) {
		state.update(({ componentNames }) => {
			return {
				componentNames,
				currentComponentName: componentNames[0]
			}
		})
	} else {
		unsubscribe()
	}
})

export const componentData = writable({
	wrapperId: '',
	defaultProps: null,
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
			componentData.update(() => {
				const { wrapperId, defaultProps } = payload
				return {
					wrapperId,
					defaultProps,
				}
			})
		}
	};

	window.onmessage = listen;
}