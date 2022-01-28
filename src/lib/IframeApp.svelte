<script>
	// @ts-ignore no type def for this component
	import { Boundary } from '@crownframework/svelte-error-boundary';

	export let Component;
	export let componentProps;
	export let Wrapper = null;
</script>

<Boundary onError={console.error}>
	{#if Wrapper}
		<svelte:component this={Wrapper}>
			<svelte:component this={Component} {...componentProps} />
		</svelte:component>
	{:else}
		<svelte:component this={Component} {...componentProps} />
	{/if}
</Boundary>
