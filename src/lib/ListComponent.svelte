<script lang="ts">
	import { state } from '$lib/stores';

	export let getComponentName;

	const setCurrentByName = (name: string) => () => {
		$state.currentComponentName = name;
	};
</script>

<ul class="component-list">
	{#each $state.componentNames as name (name)}
		<li class="component-item" class:active={name === $state.currentComponentName}>
			<button class="component-name" on:click={setCurrentByName(name)}>
				{getComponentName(name) || ''}
			</button>
		</li>
	{/each}
</ul>

<style>
	.active button {
		color: var(--color-main-500);
        font-weight: bold;
	}

	.component-list {
		padding: 0;
		margin: 0;
		list-style-type: none;
	}

	.component-item {
		padding: 0.25rem 0;
	}

	button.component-name {
		appearance: none;
		border: none;
		background: none;
		font-size: 1.1rem;
	}
</style>
