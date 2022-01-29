<script lang="ts">
	import { config, TaleNote } from '$lib';

	const getComponentName = (name: string) => name.split('/src/components/')[1].split('.svelte')[0];

	config.init({
		getComponentName
	});
</script>

<TaleNote />
