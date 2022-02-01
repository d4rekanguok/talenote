<script lang="ts">
	// import 'modern-normalize/modern-normalize.css';
	import { onMount } from 'svelte';
	import { tales } from '$lib/tales';
	import ListComponent from '$lib/ListComponent.svelte';
	import EditorProps from '$lib/EditorProps.svelte';
	import Viewer from '$lib/Viewer.svelte';
	import Logo from '$lib/Logo.svelte';

	export let getComponentName = (v) => v;
	export let viewerWidthPreset = [360, 480, 720, 900, 1200];

	let viewEl: HTMLIFrameElement = null;

	onMount(() => {
		tales.get();
	});
</script>

<main>
	<div data-tn-grid="container" class="tn-container">
		<section data-tn-grid="a">
			<Logo />
		</section>
		<section data-tn-grid="b" class="tn-section-list">
			<ListComponent {getComponentName} />
		</section>
		<section data-tn-grid="c" class="tn-section-props">
			<EditorProps {viewEl} />
		</section>
		<section data-tn-grid="d" class="tn-viewer-container">
			<Viewer {viewerWidthPreset} bind:viewEl />
		</section>
	</div>
</main>

<style>
	:global(body) {
		margin: 0;
	}

	section {
		box-sizing: border-box;
	}

	main {
		font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;

		--tale-color-gray-100: #f1f5f9;
		--tale-color-gray-300: #cbd5e1;
		--tale-color-gray-400: #94a3b8;
		--tale-color-gray-500: #64748b;
		--tale-color-gray-600: #475569;
		--tale-color-gray-700: #334155;
		--tale-color-gray-900: #0f172a;

		--tale-color-rose-200: #fecdd3;
		--tale-color-rose-700: #be123c;

		--tale-color-blue-300: #93c5fd;
		--tale-color-blue-500: #3b82f6;
		--tale-color-blue-700: #1d4ed8;
		--tale-color-blue-900: #1e3a8a;

		--tale-color-white: white;

		--tale-color-main-a: var(--tale-color-blue-500);
		--tale-color-main-b: var(--tale-color-blue-700);
		--tale-color-main-c: var(--tale-color-white);

		--tale-color-danger-a: var(--tale-color-rose-200);
		--tale-color-danger-b: var(--tale-color-rose-700);

		--tale-color-fg-a: var(--tale-color-gray-900);
		--tale-color-fg-b: var(--tale-color-gray-700);
		--tale-color-fg-c: var(--tale-color-gray-400);

		--tale-color-bg-a: var(--tale-color-gray-100);
		--tale-color-bg-b: var(--tale-color-white);
		--tale-color-bg-c: var(--tale-color-gray-300);

		--tale-ring-main: 0 0 0 2px var(--tale-color-main-c);

		color: var(--tale-color-fg-a);
		background-color: var(--tale-color-bg-a);
	}

	@media (prefers-color-scheme: dark) {
		main {
			--tale-color-main-a: var(--tale-color-blue-300);
			--tale-color-main-b: var(--tale-color-blue-500);
			--tale-color-main-c: var(--tale-color-blue-900);

			--tale-color-fg-a: var(--tale-color-gray-100);
			--tale-color-fg-b: var(--tale-color-gray-400);
			--tale-color-fg-c: var(--tale-color-gray-400);

			--tale-color-bg-a: var(--tale-color-gray-900);
			--tale-color-bg-b: var(--tale-color-gray-700);
			--tale-color-bg-c: var(--tale-color-gray-700);

			--tale-ring-main: 0 0 0 2px var(--tale-color-main-a);

			color: var(--tale-color-fg-a);
			background-color: var(--tale-color-bg-a);
		}
	}

	div[data-tn-grid='container'] {
		padding: 0 1rem;
		display: grid;
		grid-template-columns: minmax(20%, 360px) 1fr;
		grid-template-rows: 3rem 1fr 1fr;
		grid-gap: 1rem;
		grid-template-areas:
			'a d'
			'b d'
			'c d';
	}

	section[data-tn-grid='a'] {
		grid-area: a;
	}

	section[data-tn-grid='b'] {
		grid-area: b;
	}

	section[data-tn-grid='c'] {
		grid-area: c;
	}

	section[data-tn-grid='d'] {
		grid-area: d;
	}

	.tn-container {
		height: 100vh;
	}

	.tn-viewer-container {
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

	.tn-section-list {
		overflow-y: scroll;
		border-bottom: 1px solid var(--tale-color-bg-c);
	}

	.tn-section-props {
		display: inline-flex;
		flex-direction: column;
	}

	.tn-section-props,
	.tn-section-list {
		padding: 0 0.25rem;
	}
</style>
