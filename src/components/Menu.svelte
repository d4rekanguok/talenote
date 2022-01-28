<script lang="ts">
	export let viewerWidth;
	export let setViewerWidth;
	export let allowCustomWidth;
	export let setAllowCustomWidth;
	export let viewerWidthPreset;
</script>

<menu class="inline-flex">
	<button
		class="btn-width"
		class:highlight={!viewerWidth && !allowCustomWidth}
		on:click={setViewerWidth(null)}>Full</button
	>
	{#each viewerWidthPreset as w (w)}
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
		padding: 0.5rem 0.25rem;
	}

	.btn-width.highlight {
		background-color: var(--colors-main-500);
		color: var(--color-white);
	}
</style>
