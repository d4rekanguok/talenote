<script lang="ts">
	import { state } from '$lib/stores';
	import { tales } from '$lib/tales';
	import SectionHeader from '$lib/SectionHeader.svelte';
	import { componentData } from '$lib/stores';

	export let viewEl: HTMLIFrameElement;
	let error: null | string = null;
	let propContentEl: HTMLTextAreaElement;

	$: componentId = $state.currentComponentName;
	$: defaultProps = JSON.stringify($componentData.defaultProps, null, 2);
	$: taleProps = getTaleProps($tales[componentId], $state.currentTaleId);
	$: displayProps = taleProps || defaultProps;

	const getTaleProps = (tales, taleId) => {
		if (!tales) return null;
		const tale = tales.find((_tale) => _tale._taleid === taleId);
		const { _taleid, ...cleanedTale } = tale;

		viewEl.contentWindow.postMessage(
			{
				type: 'componentProps',
				payload: cleanedTale
			},
			'*'
		);

		return JSON.stringify(cleanedTale, null, 2);
	};

	const handlePropsUpdate = () => {
		const { value } = propContentEl;
		try {
			const props = JSON.parse(value);
			viewEl.contentWindow.postMessage(
				{
					type: 'componentProps',
					payload: props
				},
				'*'
			);
			error = null;
		} catch (err) {
			error = err.message;
		}
	};

	const handleReset = () => {
		viewEl.contentWindow.postMessage(
			{
				type: 'componentPropsReset'
			},
			'*'
		);
		propContentEl.value = defaultProps;
	};

	const handleCreateTale = async () => {
		const { value } = propContentEl;
		try {
			const props = JSON.parse(value);
			await tales.create({
				id: componentId,
				tale: props
			});

			error = null;
		} catch (err) {
			error = err.message;
		}
	};
</script>

<header class="header">
	<SectionHeader>Props</SectionHeader>
	<button on:click={handleCreateTale}>+ new tale</button>
</header>
{#if displayProps}
	<form class="form" on:submit|preventDefault={handlePropsUpdate}>
		<textarea bind:this={propContentEl} spellcheck={false} name="propContent" class="props-editor"
			>{displayProps}</textarea
		>
		{#if error}
			<div class="container-error">
				{error}
			</div>
		{/if}
		<div class="container-btn">
			<button type="button" on:click={handleReset} class="btn-reset">Reset</button>
			<button type="submit" class="btn-submit">Update</button>
		</div>
	</form>
{:else}
	No defaultProps found
{/if}

<style>
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.form {
		display: inline-flex;
		flex-direction: column;
		flex: 1;
		padding-bottom: 1rem;
	}

	.props-editor {
		width: 100%;
		font-family: monospace;
		font-size: 1.1rem;
		margin-bottom: 0.5rem;
		padding: 0.8rem 1rem;
		background-color: var(--color-gray-100);
		border: none;
		flex: 1;
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

	.btn-reset:focus,
	.btn-submit:focus {
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
