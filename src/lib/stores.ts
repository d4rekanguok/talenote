import { writable } from 'svelte/store';

export const state = writable({
	componentNames: [],
	currentComponentName: '',
	currentTaleId: '',
});

export const componentData = writable({
	wrapperId: '',
	defaultProps: null,
});

let unsubscribe = () => null;
unsubscribe = state.subscribe((_state) => {
	if (_state.currentComponentName === '' && _state.componentNames.length > 0) {
		state.update(({ componentNames }) => {
			return {
				componentNames,
				prevComponentName: '',
				currentComponentName: componentNames[0],
				currentTaleId: '',
			}
		})
	} else {
		unsubscribe()
	}
})

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