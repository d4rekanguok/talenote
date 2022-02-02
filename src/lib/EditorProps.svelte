<script lang="ts">
	import { state } from '$lib/stores';
	import { tales } from '$lib/tales';
	import SectionHeader from '$lib/SectionHeader.svelte';
	import { componentData } from '$lib/stores';

	export let viewEl: HTMLIFrameElement;
	let error: null | string = null;
	let formEl: HTMLFormElement;
	let taleName = null;

	$: componentId = $state.currentComponentName;
	$: defaultProps = JSON.stringify($componentData.defaultProps, null, 2);
	$: taleProps = getTaleProps($tales[componentId], $state.currentTaleId);
	$: displayProps = taleProps || defaultProps;

	const getTaleProps = (tales, taleId) => {
		if (!tales || taleId === '') {
			taleName = null;
			viewEl?.contentWindow?.postMessage(
				{
					type: 'componentPropsReset',
				},
				'*'
			);
			return null;
		}
		const tale = tales.find((_tale) => _tale._taleid === taleId);
		if (!tale) {
			taleName = null;
			return null;
		}
		const { _taleid, _talename, ...cleanedTale } = tale;

		taleName = _talename;
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
		const { value } = formEl['propContent'];
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
		formEl['propContent'].value = defaultProps;
	};

	const handleCreateTale = async () => {
		const { value } = formEl['propContent'];
		try {
			const props = JSON.parse(value);
			await tales.create({
				id: componentId,
				tale: props,
				name: taleName
			});

			error = null;
		} catch (err) {
			error = err.message;
		}
	};

	const handleSubmitOnCmdEnter = (e) => {
		if (!(e.code === 'Enter' && e.metaKey)) {
			return;
		}
		handleCreateTale();
	};
</script>

<header class="tn-header">
	<SectionHeader>Props</SectionHeader>
</header>
{#if displayProps}
	<form
		bind:this={formEl}
		on:keydown={handleSubmitOnCmdEnter}
		class="tn-form"
		on:input|preventDefault={handlePropsUpdate}
		on:submit|preventDefault={handleCreateTale}
	>
		<input
			class="tn-props-name"
			placeholder={'Give this set of props a name'}
			bind:value={taleName}
			type="text"
			name="propTitle"
		/>
		<textarea  spellcheck={false} name="propContent" class="tn-props-editor">{displayProps}</textarea>
		{#if error}
			<div class="container-error">
				{error}
			</div>
		{/if}
		<div class="tn-container-btn">
			<button type="button" on:click={handleReset} class="tn-btn-reset">Reset</button>
			<div>
				<span class="tn-submit-hint">cmd + enter</span>
				<button type="submit" class="tn-btn-submit">New Tale</button>
			</div>
		</div>
	</form>
{:else}
	No defaultProps found
{/if}

<style>
	input, textarea {
		box-sizing: border-box;
	}
	
	.tn-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tn-form {
		display: inline-flex;
		flex-direction: column;
		flex: 1;
		padding-bottom: 1rem;
	}

	.tn-props-name {
		width: 100%;
		font-size: 1.1rem;
		margin-bottom: 0.5rem;
		height: 2.25rem;
		display: inline-flex;
		align-items: center;
		padding: 0 0.7rem;
		color: var(--tale-color-fg-a);
		background-color: var(--tale-color-bg-b);
		border: none;
		border-radius: 8px;
	}

	.tn-props-name::placeholder {
		color: var(--tale-color-fg-c);
	}

	.tn-props-editor {
		width: 100%;
		font-family: monospace;
		font-size: 1.1rem;
		margin-bottom: 0.5rem;
		padding: 0.5rem 0.7rem;
		color: var(--tale-color-fg-a);
		background-color: var(--tale-color-bg-b);
		border: none;
		flex: 1;
		border-radius: 8px;
		resize: none;
	}

	.tn-props-editor::-webkit-scrollbar {
		width: 4px;
	}

	.tn-props-editor::-webkit-scrollbar-thumb {
		background-color: var(--tale-color-fg-c);
	}

	.tn-props-editor::-webkit-scrollbar-track {
		background-color: var(--tale-color-bg-b);
	}

	.tn-container-btn {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tn-btn-reset {
		border: none;
		padding: 0.5rem 0.8rem;
		border-radius: 4px;
		font-size: 1rem;
		background-color: transparent;
		color: var(--tale-color-fg-a);
	}

	.tn-btn-reset:hover {
		background-color: var(--tale-color-bg-b);
	}

	.tn-btn-submit {
		padding: 0.5rem 0.8rem;
		color: var(--tale-color-main-c);
		border: none;
		font-size: 1rem;
		border-radius: 4px;
		background-color: var(--tale-color-main-a);
	}

	.tn-btn-submit:hover {
		background-color: var(--tale-color-main-b);
	}

	.tn-btn-reset:focus,
	.tn-btn-submit:focus {
		box-shadow: var(--tale-ring-main);
	}

	.container-error {
		padding: 0.8rem 1rem;
		color: var(--tale-color-danger-b);
		background-color: var(--tale-color-danger-a);
		border-radius: 8px;
		margin-bottom: 0.5rem;
	}

	.tn-submit-hint {
		font-size: 0.9rem;
		color: var(--tale-color-fg-c);
		margin-right: 0.25rem;
	}
</style>
