<script lang="ts">
	import { fade } from 'svelte/transition';
	import { state } from '$lib/stores';
	import Menu from '$lib/ViewerMenu.svelte';

	export let viewEl: HTMLIFrameElement;
	export let viewerWidthPreset: number[];

	let viewerWidth = null;
	let allowCustomWidth = false;
	let isVisibleFS = false;

	let params = new URLSearchParams({ id: null });

	const getComponentUrl = ({ id }) => {
		params.set('id', id);
		return `/talenote/component?${params.toString()}`;
	};

	$: componentUrl = getComponentUrl({ id: $state.currentComponentName });

	const setViewerWidth = (w: number) => () => {
		allowCustomWidth = false;
		viewerWidth = w;
	};

	const setAllowCustomWidth = () => {
		allowCustomWidth = !allowCustomWidth;
	};

	let fullscreen = false;
	const setFullscreen = () => {
		fullscreen = !fullscreen;
	};
</script>

<div class="viewer-menu">
	<Menu
		{...{
			setViewerWidth,
			allowCustomWidth,
			setAllowCustomWidth,
			viewerWidthPreset,
		}}
		bind:viewerWidth
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
	<iframe bind:this={viewEl} src={componentUrl} title="viewer" class="viewer-iframe" />
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
		background-color: rgba(30, 58, 138, 0.7);
		padding: 0.5rem 0.8rem;
		color: var(--color-white);
	}

	.btn-fs:hover {
		background-color: rgba(30, 58, 138, 1);
	}

	.btn-fs:focus {
		box-shadow: var(--ring-main);
	}
</style>
