<script context="module">
	const modules = import.meta.globEager('/src/components/**/*.svelte');
</script>

<script>
	import IframeApp from '$lib/IframeApp.svelte';
    import CustomWrapper from './_CustomWrapper.svelte';
    
    const wrappers = {
		custom: CustomWrapper
	};
</script>

<IframeApp {modules} {wrappers} />
