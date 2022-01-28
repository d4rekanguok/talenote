<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { config, componentStore } from '$lib/config.store';
	import Menu from '$lib/ViewerMenu.svelte';
	import IframeApp from '$lib/IframeApp.svelte';

	export let props = '';

	let viewerEl: HTMLIFrameElement;
	let renderedComponent;
	let viewerWidth = null;
	let allowCustomWidth = false;
	let isVisibleFS = false;

	const setViewerWidth = (w: number) => () => {
		allowCustomWidth = false;
		viewerWidth = w;
	};

	const setAllowCustomWidth = () => {
		allowCustomWidth = !allowCustomWidth;
	};

	const renderComponent = (Component, wrapperId, defaultProps, props) => {
		if (!Component || !viewerEl) return;

		const componentProps = props.length > 0 ? JSON.parse(props) : defaultProps;

		renderedComponent?.$destroy?.();
		renderedComponent = new IframeApp({
			target: viewerEl.contentWindow.document.body,
			props: {
				Component,
				Wrapper: $config.wrappers[wrapperId] || null,
				componentProps
			}
		});
	};

	onMount(() => {
		const styles = Array.from(document.head.querySelectorAll('style')).map((node) =>
			node.cloneNode(true)
		);
		viewerEl.contentWindow.document.head.append(...styles);

		renderComponent(
			$componentStore.Component,
			$componentStore.wrapperId,
			$componentStore.defaultProps,
			props
		);
	});

	$: renderComponent(
		$componentStore.Component,
		$componentStore.wrapperId,
		$componentStore.defaultProps,
		props
	);

	let fullscreen = false;
	const setFullscreen = () => {
		fullscreen = !fullscreen;
	};
</script>

<div class="viewer-menu">
	<Menu
		{...{
			viewerWidth,
			setViewerWidth,
			allowCustomWidth,
			setAllowCustomWidth
		}}
	/>
</div>
<div
	class="container-iframe"
	class:fullscreen
	on:mouseenter={() => (isVisibleFS = true)}
	on:mouseleave={() => (isVisibleFS = false)}
	style:width={viewerWidth ? viewerWidth + 'px' : `100%`}
>
	{#if isVisibleFS}
		<button transition:fade class="btn-fs" on:click={setFullscreen}>
			{fullscreen ? 'Exit fullscreen' : 'View fullscreen'}
		</button>
	{/if}
	<iframe title="viewer" class="viewer-iframe" bind:this={viewerEl} />
</div>

<style>
	.viewer-menu {
		height: 3rem;
		top: 0;
		position: sticky;
		z-index: 50;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.container-iframe {
		position: relative;
		height: 100%;
		width: 100%;
	}

	.viewer-iframe {
		width: 100%;
		height: 100%;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		background-color: white;
		border: 1px solid var(--color-gray-300);
	}

	.container-iframe.fullscreen {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
		width: 100vw;
		height: 100vh;
	}

	.container-iframe.fullscreen .viewer-iframe {
		border-radius: 0;
	}

	.btn-fs {
		position: absolute;
		right: 1rem;
		top: 1rem;
		border: none;
		border-radius: 8px;
		background-color: rgba(0, 0, 0, 0.6);
		padding: 0.5rem 0.8rem;
		color: var(--color-white);
	}
</style>
