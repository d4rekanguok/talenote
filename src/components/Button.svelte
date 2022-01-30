<script context="module" lang="ts">
	export const defaultProps = {
		text: 'Hello'
	};
</script>

<script type="ts">
    export let text = defaultProps.text
</script>

<button>{text}</button>

<style>
	button {
		background-color: blue;
		color: white;
	}
</style>