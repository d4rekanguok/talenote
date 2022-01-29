<script lang="ts">
	import SectionHeader from '$lib/SectionHeader.svelte';
	import { tales } from '$lib/tales';
	import { state } from '$lib/stores';

	export let getComponentName;

	const setCurrentByName = (name: string) => () => {
		$state.currentComponentName = name;
	};

	const setCurrentTale = (taleId: string) => () => {
		$state.currentTaleId = taleId;
	};
</script>

<SectionHeader>Components</SectionHeader>
<ul class="component-list">
	{#each $state.componentNames as name (name)}
		<li class="component-item" class:active={name === $state.currentComponentName}>
			<button class="component-name" on:click={setCurrentByName(name)}>
				{getComponentName(name) || ''}
			</button>
			{#if $tales[name]}
				<ul>
					{#each $tales[name] as { _taleid } (_taleid)}
						<button on:click={setCurrentTale(_taleid)}>{_taleid}</button>
					{/each}
				</ul>
			{/if}
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
