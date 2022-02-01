<script lang="ts">
	export let viewerWidth;
	export let setViewerWidth;
	export let allowCustomWidth;
	export let setAllowCustomWidth;
	export let viewerWidthPreset;
	export let backgroundColor;
</script>

<menu class="tn-menu">
	<button
		class="tn-btn-width"
		class:tn-highlight={!viewerWidth && !allowCustomWidth}
		on:click={setViewerWidth(null)}>Full</button
	>
	{#each viewerWidthPreset as w (w)}
		<button
			on:click={setViewerWidth(w)}
			class="tn-btn-width"
			class:tn-highlight={w === viewerWidth && !allowCustomWidth}>{w}</button
		>
	{/each}
	<button class="tn-btn-width" class:tn-highlight={allowCustomWidth} on:click={setAllowCustomWidth}
		>Custom</button
	>
	{#if allowCustomWidth}
		<input class="tn-input-width" type="number" bind:value={viewerWidth} />
	{/if}
	<span class="tn-divider" aria-hidden />
	<input class="tn-input-width" type="text" bind:value={backgroundColor} />
</menu>

<style>
	button {
		font-size: 1rem;
	}

	.tn-menu {
		display: inline-flex;
		gap: 0.25rem;
		align-items: center;
	}

	.tn-divider {
		height: 2rem;
		width: 1px;
		background-color: var(--tale-color-bg-c);
		margin: 0 0.75rem;
	}

	.tn-btn-width {
		border: none;
		border-radius: 4px;
		padding: 0 0.6rem;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: var(--tale-color-fg-b);
		background-color: var(--tale-color-bg-a);
		height: 2.25rem;
	}

	.tn-input-width {
		height: 2.25rem;
		border: 1px solid var(--tale-color-bg-c);
		color: var(--tale-color-fg-a);
		background-color: var(--tale-color-bg-a);
		border-radius: 4px;
		padding: 0 0.5rem;
		width: 6rem;
	}

	.tn-input-width:focus,
	.tn-input-width:hover {
		background-color: var(--tale-color-bg-b);
	}

	.tn-btn-width:hover {
		background-color: var(--tale-color-bg-b);
	}

	.tn-btn-width:focus {
		box-shadow: var(--tale-ring-main);
	}

	.tn-btn-width.tn-highlight {
		background-color: var(--tale-color-bg-c);
		color: var(--tale-color-fg-a);
	}
</style>
