<script lang="ts">
	import { config } from '~/components/config.store';
	export let viewerWidth;
	export let setViewerWidth;
	export let allowCustomWidth;
	export let setAllowCustomWidth;
</script>

<menu class="inline-flex">
	<button
		class="btn-width"
		class:highlight={!viewerWidth && !allowCustomWidth}
		on:click={setViewerWidth(null)}>Full</button
	>
	{#each $config.viewerWidthPreset as w (w)}
		<button
			on:click={setViewerWidth(w)}
			class="btn-width"
			class:highlight={w === viewerWidth && !allowCustomWidth}>{w}</button
		>
	{/each}
	<button class="btn-width" class:highlight={allowCustomWidth} on:click={setAllowCustomWidth}
		>Custom</button
	>
	{#if allowCustomWidth}
		<input class="w-20 px-1" type="number" bind:value={viewerWidth} />
	{/if}
</menu>

<style>
	.btn-width {
		border: none;
		border-radius: 4px;
		padding: 0 0.6rem;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background-color: var(--color-bg);
		height: 2.25rem;
	}

	.btn-width.highlight {
		background-color: var(--color-main-500);
		color: var(--color-text-on-dark);
	}
</style>
