<script lang="ts">
	import 'modern-normalize/modern-normalize.css';
	import { onMount } from 'svelte';
	import { tales } from '$lib/tales';
	import ListComponent from '$lib/ListComponent.svelte';
	import EditorProps from '$lib/EditorProps.svelte';
	import Viewer from '$lib/Viewer.svelte';

	export let getComponentName = (v) => v;
	export let viewerWidthPreset = [360, 480, 720, 900, 1200];

	let viewEl: HTMLIFrameElement = null;

	onMount(() => {
		tales.get()
	})
</script>

<main>
	<div data-grid="container" class="container">
		<section data-grid="a" class="section-list">
			<ListComponent {getComponentName} />
		</section>
		<section data-grid="b" class="section-props">
			<EditorProps {viewEl} />
		</section>
		<section data-grid="c" class="viewer-container">
			<Viewer {viewerWidthPreset} bind:viewEl />
		</section>
	</div>
</main>

<style>
	main {
		--color-gray-100: #f1f5f9;
		--color-gray-300: #cbd5e1;
		--color-gray-300: #cbd5e1;
		--color-rose-200: #fecdd3;
		--color-rose-700: #be123c;
		--color-blue-500: #3b82f6;
		--color-blue-700: #1d4ed8;
		--color-white: white;
		--color-main-500: var(--color-blue-500);
		--color-main-700: var(--color-blue-700);
		--color-text-on-light: #0f172a;
		--color-text-on-dark: var(--color-white);
		--color-bg: var(--color-white);
		--color-bg-lighter: var(--color-gray-100);
		--ring-main: 0 0 0 2px var(--color-main-700);

		color: var(--color-text-on-light);
	}

	div[data-grid='container'] {
		padding: 1rem 1rem 0;
		display: grid;
		grid-template-columns: minmax(20%, 360px) 1fr;
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

	.viewer-container {
		align-self: stretch;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0.5rem 0 0;
		overflow: hidden;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
	}

	.section-list {
		overflow-y: scroll;
		border-bottom: 1px solid var(--color-gray-300);
	}

	.section-props {
		display: inline-flex;
		flex-direction: column;
	}

	.section-props, .section-list {
		padding: 0 0.25rem;
	}
</style>
