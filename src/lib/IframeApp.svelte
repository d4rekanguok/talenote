<script>
	import 'modern-normalize/modern-normalize.css';
	// @ts-ignore
	import { Boundary } from '@crownframework/svelte-error-boundary';
	import { page } from '$app/stores';
	import { browser } from '$app/env';
	import WrapperCenter from '$lib/WrapperCenter.svelte';

	const defaultWrappers = {
		center: WrapperCenter
	};

	export let modules = {};
	export let wrappers = defaultWrappers;
	$: wrappers = { ...defaultWrappers, ...wrappers };

	let Wrapper = null;
	let Component = null;
	let defaultProps = {};
	let wrapperId = '';

	const getComponent = (currentComponentName) => {
		const imported = modules[currentComponentName];
		if (!currentComponentName || !imported) return;
		Component = imported.default;
		defaultProps = imported.defaultProps || {};
		wrapperId = imported.taleWrapper || '';
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

	$: getComponent($page.url.searchParams.get('id'));
	$: syncComponentList(modules);
	$: syncComponentData(defaultProps, wrapperId);
	$: Wrapper = wrappers[wrapperId] || null;
</script>

<main>
{#if Component}
	<Boundary onError={console.error}>
		{#if Wrapper}
			<svelte:component this={Wrapper}>
				<svelte:component this={Component} {...defaultProps} />
			</svelte:component>
		{:else}
			<svelte:component this={Component} {...defaultProps} />
		{/if}
	</Boundary>
{:else}
	<WrapperCenter>Nothing to see here</WrapperCenter>
{/if}
</main>

<style>
	main {
		min-height: 100vh;
	}
</style>