<script lang="ts">
	import { componentData } from '$lib/config.store';
	export let props: string;

	let error: null | string = null;

	const onPropsChange = (e: SubmitEvent) => {
		const { value } = e.target['propContent'];
		try {
			JSON.parse(value);
			props = value;
            error = null;
		} catch (err) {
			error = err.message;
		}
	};
</script>

{#if $componentData.defaultProps}
	<form on:submit|preventDefault={onPropsChange}>
		<textarea spellcheck={false} name="propContent" rows={10} class="props-editor"
			>{JSON.stringify($componentData.defaultProps, null, 2)}</textarea
		>
		{#if error}
			<div class="container-error">
				{error}
			</div>
		{/if}
		<div class="container-btn">
            <button type="button" class="btn-reset">Reset</button>
			<button type="submit" class="btn-submit">Update</button>
		</div>
	</form>
{:else}
	No defaultProps found
{/if}

<style>
	.props-editor {
		width: 100%;
		font-family: monospace;
		font-size: 1.1rem;
		margin-bottom: 0.5rem;
		padding: 0.8rem 1rem;
		background-color: var(--color-gray-100);
		border: none;
		border-radius: 8px;
	}

    .container-btn {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .btn-reset {
        border: none;
        padding: 0.5rem 0.8rem;
        border-radius: 4px;
        background-color: transparent;
        color: var(--color-text-on-light);
    }

	.btn-reset:hover {
		background-color: var(--color-bg-lighter);
	}

	.btn-submit {
		padding: 0.5rem 0.8rem;
		color: var(--color-text-on-dark);
		border: none;
		border-radius: 4px;
		background-color: var(--color-main-500);
	}

	.btn-submit:hover {
		background-color: var(--color-main-700);
	}

    .btn-reset:focus, .btn-submit:focus {
        box-shadow: var(--ring-main);
    }

	.container-error {
		padding: 0.8rem 1rem;
		color: var(--color-rose-600);
		background-color: var(--color-rose-200);
		border-radius: 8px;
		margin-bottom: 0.5rem;
	}
</style>
