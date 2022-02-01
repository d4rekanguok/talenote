<script lang="ts">
	// @ts-ignore
	import { Boundary } from '@crownframework/svelte-error-boundary';
	import { browser } from '$app/env';
	import { page } from '$app/stores';
	import WrapperCenter from '$lib/WrapperCenter.svelte';

	const defaultWrappers = {
		none: null,
		center: WrapperCenter
	};

	export let modules = {};
	export let wrappers: Record<string, any> = defaultWrappers;
	$: wrappers = { ...defaultWrappers, ...wrappers };
	$: defaultWrapperId = wrappers.default;

	let props = {};
	let Wrapper = null;
	let Component = null;
	let defaultProps = {};
	let wrapperId = defaultWrapperId;

	const getComponent = (currentComponentName) => {
		const imported = modules[currentComponentName];
		if (!currentComponentName || !imported) return;
		Component = imported.default;
		defaultProps = imported.defaultProps || {};
		wrapperId = imported.taleWrapper || defaultWrapperId;
	};

	const syncComponentList = (modules) => {
		if (browser && window.parent) {
			window.parent.postMessage({
				type: 'componentList',
				payload: Object.keys(modules)
			});
		}
	};

	const syncComponentData = (defaultProps, wrapperId) => {
		if (browser && window.parent) {
			window.parent.postMessage({
				type: 'componentData',
				payload: {
					defaultProps,
					wrapperId
				}
			});
		}
	};

	const syncComponentProps = (e: MessageEvent) => {
		const { type, payload } = e.data;
		if (type === 'componentProps') {
			props = payload;
		}
		if (type === 'componentPropsReset') {
			props = {};
		}
	};

	$: getComponent($page?.url?.searchParams.get('id'));
	$: syncComponentList(modules);
	$: syncComponentData(defaultProps, wrapperId);
	$: Wrapper = wrappers[wrapperId] || null;
	$: componentProps = Object.keys(props).length > 0 ? props : defaultProps;
</script>

<svelte:window on:message={syncComponentProps} />

<main class="tn-main">
	{#if Component}
		<Boundary onError={console.error}>
			{#if Wrapper}
				<svelte:component this={Wrapper}>
					<svelte:component this={Component} {...componentProps} />
				</svelte:component>
			{:else}
				<svelte:component this={Component} {...componentProps} />
			{/if}
		</Boundary>
	{:else}
		<WrapperCenter>Loading components...</WrapperCenter>
	{/if}
</main>

<style>
	.tn-main {
		position: relative;
		min-height: 100vh;
		height: 1px;
	}
</style>
