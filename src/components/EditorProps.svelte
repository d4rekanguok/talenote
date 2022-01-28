<script lang="ts">
	import { browser } from '$app/env';
	export let props: {};

	const onPropsChange = (e: SubmitEvent) => {
		const { value } = e.target['propContent'];
		props = JSON.parse(value);
	};
</script>

{#if browser && props}
	<form on:submit|preventDefault={onPropsChange}>
		<textarea name="propContent" rows={10} class="props-editor"
			>{JSON.stringify(props, null, 2)}</textarea
		>
		<button type="submit" class="bg-blue-500 text-white px-4 py-2">Update</button>
	</form>
{:else}
	No defaultProps found
{/if}

<style>
	.props-editor {
        width: 100%;
        font-family: monospace;
        font-size: 1.1rem;
    }
</style>
