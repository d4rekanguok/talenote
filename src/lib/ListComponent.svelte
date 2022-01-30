<script lang="ts">
	import SectionHeader from '$lib/SectionHeader.svelte';
	import { tales } from '$lib/tales';
	import { state } from '$lib/stores';

	export let getComponentName;

	const setCurrentComponentTale =
		(name: string, taleId: string = 'default') =>
		() => {
			$state.currentComponentName = name;
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
			<details>
				<summary class="component-name">{getComponentName(name) || ''}</summary>
				<ul class="tale-list">
					<li class="tale">
						<button
							class="tale-name"
							class:active={$state.currentTaleId === 'default' &&
								$state.currentComponentName === name}
							on:click={setCurrentComponentTale(name)}>Default props</button
						>
					</li>
					{#if $tales[name]}
						{#each $tales[name] as { _taleid, _talename } (_taleid)}
							{@const active = _taleid === $state.currentTaleId}
							<li class="tale">
								<button
									class="tale-name"
									class:active
									aria-label={`Open "${_talename}"`}
									on:click={setCurrentComponentTale(name, _taleid)}>{_talename || _taleid}</button
								>
								<button class="btn-delete" aria-label={`Delete "${_talename}"`} on:click={handleDeleteTaleById(_taleid)}>&times;</button>
							</li>
						{/each}
					{/if}
				</ul>
			</details>
		</li>
	{/each}
</ul>

<style>
	.component-list {
		padding: 0;
		margin: 0;
		list-style-type: none;
	}

	.component-item {
		padding: 0.25rem 0;
	}

	.component-name {
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
		padding: 0 0 0 1rem;
	}

	.tale {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		justify-content: space-between;
	}

	.btn-delete {
		color: var(--color-rose-700);
		background-color: var(--color-rose-200);
		padding: 0.5rem 0.75rem;
		border-radius: 4px;
	}

	.tale .btn-delete {
		opacity: 0;
	}

	.tale:hover .btn-delete {
		opacity: 1;
	}

	.tale-name, .btn-delete {
		border: none;
		font-weight: normal;
	}

	.tale-name {
		text-align: left;
		flex: 1;
		padding: 0.5rem;
		background-color: transparent;
		color: var(--color-text-on-light);
	}

	.tale-name:hover,
	.component-name:hover {
		background-color: var(--color-gray-100);
	}

	.tale button.active {
		font-weight: 600;
		color: var(--color-main-500);
	}
</style>
