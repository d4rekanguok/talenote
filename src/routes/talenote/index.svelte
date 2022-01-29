<script lang="ts">
	import { TaleNote } from '$lib';

	const getComponentName = (name: string) => name.split('/src/components/')[1].split('.svelte')[0];
</script>

<TaleNote {getComponentName} />
