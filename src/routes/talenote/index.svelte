<script context="module" lang="ts">
	const modules = import.meta.globEager('/src/components/**/*.svelte');
</script>

<script lang="ts">
	import TaleNote, { config } from '$lib/TaleNote.svelte';
	import CustomWrapper from './_CustomWrapper.svelte';

	const getComponentName = (name: string) => name.split('/src/components/')[1].split('.svelte')[0];

	const wrappers = {
		custom: CustomWrapper
	};

	config.init({
		modules,
		getComponentName,
		wrappers
	});
</script>

<TaleNote />
