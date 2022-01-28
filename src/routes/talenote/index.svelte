<script context="module">
	const modules = import.meta.globEager('/src/lib/**/*.svelte');
</script>

<script lang="ts">
	import TaleNote from '~/components/TaleNote.svelte';
</script>

<TaleNote {modules} />
