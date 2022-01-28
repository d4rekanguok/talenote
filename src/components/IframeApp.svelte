<script>
	export let Component;
	export let componentProps;
	export let Wrapper = null;
</script>

{#if Wrapper}
	<Wrapper>
		<svelte:component this={Component} {...componentProps} />
	</Wrapper>
{:else}
	<svelte:component this={Component} {...componentProps} />
{/if}
