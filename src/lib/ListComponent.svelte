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

	const handleDeleteTaleById = (taleId: string) => () => {
		tales.del({
			id: $state.currentComponentName,
			taleId
		});
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
				<ul class="tale-list">
					{#each $tales[name] as { _taleid, _talename } (_taleid)}
						{@const active = _taleid === $state.currentTaleId}
						<li class="tale">
							<button class="tale-name" class:active on:click={setCurrentTale(_taleid)}>{_talename || _taleid}</button>
							{#if active}
								<button on:click={handleDeleteTaleById(_taleid)}>&times;</button>
							{/if}
						</li>
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
		width: 100%;
		padding: 0.5rem;
		text-align: left;
	}

	.tale-list {
		margin: 0.25rem 0;
		padding: 0;
	}

	.tale {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tale button {
		border: none;
		font-weight: normal;
		background-color: transparent;
		padding: 0.5rem;
		color: var(--color-text-on-light);
	}

	.tale-name {
		text-align: left;
		flex: 1;
	}

	.tale-name:hover, .component-name:hover {
		background-color: var(--color-gray-100);
	}

	.tale button.active {
		color: var(--color-main-500);
	}
</style>
