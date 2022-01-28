<script lang="ts">
	import 'modern-normalize';

	export let modules = {};
	export let viewerWidthPreset = [360, 480, 720, 800, 1200];

	$: componentNames = Object.keys(modules);
	// import { Boundary } from '@crownframework/svelte-error-boundary'
	import { browser } from '$app/env';
	import { afterUpdate, onMount } from 'svelte';

	import Menu from '~/components/Menu.svelte';

	$: current = componentNames?.[0];
	let Component;
	let props = {};
	let viewerEl: HTMLIFrameElement;
	let viewerWidth = null;
	let allowCustomWidth = false;
	$: current && loadComponent(current);

	const loadComponent = async (current) => {
		try {
			Component = modules[current].default;
			props = modules[current].defaultProps || {};
		} catch (err) {
			console.error(err);
		}
	};
	const setCurrentByName = (name: string) => () => {
		current = name;
	};

	const onPropsChange = (e) => {
		const value = e.target.propContent.value;
		props = JSON.parse(value);
	};

	const setViewerWidth = (w: number) => () => {
		allowCustomWidth = false;
		viewerWidth = w;
	};

	const setAllowCustomWidth = () => {
		allowCustomWidth = !allowCustomWidth;
	};

	let renderedComponent;

	onMount(() => {
		const styles = Array.from(document.head.querySelectorAll('style')).map((node) =>
			node.cloneNode(true)
		);
		viewerEl.contentWindow.document.head.append(...styles);
	});

	afterUpdate(() => {
		if (!Component) return;
		renderedComponent?.$destroy?.();
		renderedComponent = new Component({
			target: viewerEl.contentWindow.document.body,
			props
		});
	});
</script>

<main>
	<div data-grid="container" class="container">
		<section data-grid="a" class="overflow-y-scroll">
			<h1 class="section-header">Components</h1>
			<ul class="relative">
				{#each componentNames as name (name)}
					<li class:dim={name === current}>
						<button on:click={setCurrentByName(name)}>
							{name.split('/src/lib/')[1] || ''}
						</button>
					</li>
				{/each}
			</ul>
		</section>
		<section data-grid="b" class="overflow-y-scroll">
			<h1 class="section-header">Props</h1>
			{#if browser && props}
				<form on:submit|preventDefault={onPropsChange}>
					<textarea name="propContent" rows={10} class="w-full p-2 border border-blue-200 font-mono"
						>{JSON.stringify(props, null, 2)}</textarea
					>
					<button type="submit" class="bg-blue-500 text-white px-4 py-2">Update</button>
				</form>
			{:else}
				No defaultProps found
			{/if}
		</section>
		<section data-grid="c" class="viewer-container">
			<div class="viewer-menu">
				<Menu
					{...{
						viewerWidth,
						setViewerWidth,
						allowCustomWidth,
						setAllowCustomWidth,
						viewerWidthPreset
					}}
				/>
			</div>
			<iframe
				title="viewer"
				class="viewer-iframe"
				bind:this={viewerEl}
				style:width={viewerWidth ? viewerWidth + 'px' : `100%`}
			/>
		</section>
	</div>
</main>

<style>
	main {
		--color-gray-100: #f4f4f5;
		--color-gray-300: #d4d4d8;
		--colors-main-500: #3b82f6;
		--color-white: white;
	}

	div[data-grid='container'] {
		padding: 1rem 1rem 0;
		display: grid;
		grid-template-columns: 1fr 4fr;
		grid-template-rows: 1fr 1fr;
		grid-gap: 1rem;
		grid-template-areas:
			'a c'
			'b c';
	}

	section[data-grid='a'] {
		grid-area: a;
	}

	section[data-grid='b'] {
		grid-area: b;
	}

	section[data-grid='c'] {
		grid-area: c;
	}

	.container {
		height: 100vh;
	}

	.section-header {
		margin-bottom: 1rem;
		font-size: 1.5rem;
		padding: 0 0.5rem;
		background-color: var(--color-white);
		top: 0;
		position: sticky;
		z-index: 1;
	}

	.viewer-container {
		align-self: stretch;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0.5rem 0;
		overflow: hidden;
		background-color: var(--color-gray-100);
		border: 1px solid var(--color-gray-300);
		border-top-left-radius: 30px;
		border-top-right-radius: 30px;
	}

	.viewer-menu {
		height: 3rem;
		top: 0;
		position: sticky;
		background-color: var(--color-gray-100);
		z-index: 50;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.viewer-iframe {
		border: 1px solid var(--color-gray-300);
		height: 100%;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
	}

	.dim {
		opacity: 0.4;
	}
</style>
