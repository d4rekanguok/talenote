<script context="module" lang="ts">
	export const defaultProps = {
		text: 'Hello'
	};

    export const taleWrapper = 'center'

</script>

<script type="ts">
    export let text = defaultProps.text
</script>

<button>{text}</button>
