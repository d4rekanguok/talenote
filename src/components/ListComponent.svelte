<script lang="ts">
	export let componentNames: string[];
	export let setCurrentByName: (name: string) => (e: MouseEvent) => void;
	export let current: string;
	export let getComponentName: (name: string) => string;
</script>

<ul class="component-list">
	{#each componentNames as name (name)}
		<li class="component-item" class:dim={name === current}>
			<button class="component-name" on:click={setCurrentByName(name)}>
				{getComponentName(name) || ''}
			</button>
		</li>
	{/each}
</ul>

<style>
	.dim {
		opacity: 0.4;
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
