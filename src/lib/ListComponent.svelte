<script lang="ts">
	import { state, config } from '$lib/config.store';

	const setCurrentByName = (name: string) => () => {
		$state.currentComponentName = name;
	};

	const syncComponentList = (e: MessageEvent) => {
		const { type, payload } = e.data
		if (type === 'componentList') {
			$state.componentNames = payload
		}
	}

	$: console.log($state.componentNames)
</script>

<!-- <svelte:window on:message={syncComponentList}></svelte:window> -->

<ul class="component-list">
	{#each $state.componentNames as name (name)}
		<li class="component-item" class:active={name === $state.currentComponentName}>
			<button class="component-name" on:click={setCurrentByName(name)}>
				{$config.getComponentName(name) || ''}
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
