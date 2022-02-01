<script lang="ts">
	import SectionHeader from '$lib/SectionHeader.svelte';
	import { tales } from '$lib/tales';
	import { state } from '$lib/stores';

	export let getComponentName;

	const setCurrentComponentTale =
		(name: string, taleId: string = '') =>
		() => {
			$state.currentTaleId = taleId;
			$state.currentComponentName = name;
		};

	const handleDeleteTaleById = (taleId: string) => () => {
		tales.del({
			id: $state.currentComponentName,
			taleId
		});
	};
</script>

<SectionHeader>Components</SectionHeader>
<ul class="tn-component-list">
	{#each $state.componentNames as name (name)}
		<li class="tn-component-item" class:active={name === $state.currentComponentName}>
			<details>
				<summary class="tn-component-name">{getComponentName(name) || ''}</summary>
				<ul class="tn-tale-list">
					<li class="tn-tale">
						<button
							class="tn-tale-name"
							class:tn-active={$state.currentTaleId === '' &&
								$state.currentComponentName === name}
							on:click={setCurrentComponentTale(name)}>Default props</button
						>
					</li>
					{#if $tales[name]}
						{#each $tales[name] as { _taleid, _talename } (_taleid)}
							{@const active = _taleid === $state.currentTaleId}
							<li class="tn-tale">
								<button
									class="tn-tale-name"
									class:tn-active={active}
									aria-label={`Open "${_talename}"`}
									on:click={setCurrentComponentTale(name, _taleid)}>{_talename || _taleid}</button
								>
								<button
									class="tn-btn-delete"
									aria-label={`Delete "${_talename}"`}
									on:click={handleDeleteTaleById(_taleid)}>&times;</button
								>
							</li>
						{/each}
					{/if}
				</ul>
			</details>
		</li>
	{/each}
</ul>

<style>
	summary, details, ul, li {
		box-sizing: border-box;
	}

	button {
		font-size: 1rem;
	}
	
	.tn-component-list {
		padding: 0;
		margin: 0;
		list-style-type: none;
	}

	.tn-component-item {
		padding: 0.25rem 0;
	}

	.tn-component-name {
		appearance: none;
		border: none;
		background: none;
		font-size: 1.1rem;
		width: 100%;
		padding: 0.5rem;
		text-align: left;
		border-radius: 4px;
		color: var(--tale-color-fg-b);
	}

	.tn-tale-list {
		margin: 0.25rem 0;
		padding: 0 0 0 1rem;
	}

	.tn-tale {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		justify-content: space-between;
	}

	.tn-btn-delete {
		color: var(--tale-color-danger-b);
		background-color: var(--tale-color-danger-a);
		padding: 0.5rem 0.75rem;
	}

	.tn-tale .tn-btn-delete {
		opacity: 0;
	}

	.tn-tale:hover .tn-btn-delete {
		opacity: 1;
	}

	.tn-tale-name,
	.tn-btn-delete {
		border: none;
		font-weight: normal;
		border-radius: 4px;
	}

	.tn-tale-name {
		text-align: left;
		flex: 1;
		padding: 0.5rem;
		background-color: transparent;
		color: var(--tale-color-fg-b);
	}

	.tn-tale-name:hover,
	.tn-component-name:hover {
		color: var(--tale-color-fg-a);
		background-color: var(--tale-color-bg-b);
	}

	.tn-tale button.tn-active {
		font-weight: 600;
		color: var(--tale-color-main-a);
	}
</style>
