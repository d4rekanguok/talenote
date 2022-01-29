<script lang="ts">
	export let viewerWidth;
	export let setViewerWidth;
	export let allowCustomWidth;
	export let setAllowCustomWidth;
	export let viewerWidthPreset;
</script>

<menu class="menu">
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
		<input class="input-width" type="number" bind:value={viewerWidth} />
	{/if}
</menu>

<style>
	.menu {
		display: inline-flex;
		gap: 0.25rem;
	}
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
	
	.input-width {
		height: 2.25rem;
		border: 1px solid var(--color-gray-300);
		border-radius: 4px;
		padding: 0 0.5rem;
		width: 6rem;
	}

	.btn-width:hover {
		background-color: var(--color-bg-lighter);
	}

	.btn-width:focus {
		box-shadow: var(--ring-main);
	}

	.btn-width.highlight {
		background-color: var(--color-main-500);
		color: var(--color-text-on-dark);
	}
</style>
