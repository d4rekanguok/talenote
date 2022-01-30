<script context="module">
	const modules = import.meta.globEager('/src/components/**/*.svelte');
</script>

<script>
	import { DisplayComponent } from '$lib';
	import CustomWrapper from './_CustomWrapper.svelte';

	const wrappers = {
		custom: CustomWrapper,
		default: 'center',
	};
</script>

<DisplayComponent {modules} {wrappers} />
