<script context="module" lang="ts">
	const modules = import.meta.globEager('/src/lib/**/*.svelte');
	const getComponentName = (name: string) => name.split('/src/lib/')[1];
</script>

<script lang="ts">
	import TaleNote from '~/components/TaleNote.svelte';
	import CustomWrapper from './_CustomWrapper.svelte';

	const wrappers = {
		custom: CustomWrapper
	};
</script>

<TaleNote {modules} {getComponentName} {wrappers} />
