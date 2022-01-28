<script context="module" lang="ts">
	const modules = import.meta.globEager('/src/lib/**/*.svelte');
    const getComponentName = (name: string) => name.split('/src/lib/')[1]
</script>

<script lang="ts">
	import TaleNote from '~/components/TaleNote.svelte';
</script>

<TaleNote {modules} {getComponentName} />
