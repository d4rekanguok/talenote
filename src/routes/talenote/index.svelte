<script context="module">
    const modules = import.meta.globEager('/src/sections/*.svelte')
    const componentNames = Object.keys(modules)
</script>

<script lang="ts">
    // import { Boundary } from '@crownframework/svelte-error-boundary'
    import { browser } from '$app/env'
    import { afterUpdate, onMount } from 'svelte'

    let current = componentNames[0]
    let Component
    let props = {}
    let viewerEl: HTMLIFrameElement
    let viewerWidth = null
    let allowCustomWidth = false
    let viewerWidthPreset = [360, 480, 720, 800, 1200]
    $: loadComponent(current)

    const loadComponent = async (current) => {
        try {
            // const res = await modules[current]()
            Component = modules[current].default
            props = modules[current].defaultProps || {}
        } catch (err) {
            console.error(err)
        }
    }
    const setCurrentByName = (name) => () => {
        current = name
    }

    const onPropsChange = (e) => {
        const value = e.target.propContent.value
        props = JSON.parse(value)
    }

    const setViewerWidth = (w: number) => () => {
        allowCustomWidth = false
        viewerWidth = w
    }

    const setAllowCustomWidth = () => {
        allowCustomWidth = !allowCustomWidth
    }

    let renderedComponent

    onMount(() => {
        const styles = Array.from(document.head.querySelectorAll('style')).map((node) =>
            node.cloneNode(true)
        )
        viewerEl.contentWindow.document.head.append(...styles)
    })

    afterUpdate(() => {
        if (!Component) return
        renderedComponent?.$destroy?.()
        renderedComponent = new Component({
            target: viewerEl.contentWindow.document.body,
            props,
        })
    })
</script>

<div data-grid="container" class="h-screen">
    <section data-grid="a" class="overflow-y-scroll">
        <h1 class="mb-4 text-xl py-2 bg-white top-0 sticky z-1">Components</h1>
        <ul class="relative">
            {#each componentNames as name (name)}
                <li
                    class:dim={name === current}
                >
                    <button on:click={setCurrentByName(name)}>
                        {name.split('/src/sections/')[1] || ''}
                    </button>
                </li>
            {/each}
        </ul>
    </section>
    <section data-grid="b" class="overflow-y-scroll">
        <h1 class="mb-4 text-xl py-2 bg-white top-0 sticky z-1">Props</h1>
        {#if browser && props}
            <form on:submit|preventDefault={onPropsChange}>
                <textarea
                    name="propContent"
                    rows={10}
                    class="w-full p-2 border border-blue-200 font-mono"
                    >{JSON.stringify(props, null, 2)}</textarea
                >
                <button type="submit" class="bg-blue-500 text-white px-4 py-2">Update</button>
            </form>
        {:else}
            No defaultProps found
        {/if}
    </section>
    <section
        data-grid="c"
        class="viewer-container"
    >
        <div class="h-12 top-0 sticky bg-gray-100 z-50 w-full flex items-center justify-center">
            <menu class="inline-flex">
                <button
                    class="btn-width"
                    class:highlight={!viewerWidth && !allowCustomWidth}
                    on:click={setViewerWidth(null)}>Full</button
                >
                {#each viewerWidthPreset as w (w)}
                    <button
                        on:click={setViewerWidth(w)}
                        class="btn-width"
                        class:highlight={w === viewerWidth && !allowCustomWidth}
                    >
                {/each}
                <button
                    class="btn-width"
                    class:highlight={allowCustomWidth}
                    on:click={setAllowCustomWidth}>Custom</button
                >
                {#if allowCustomWidth}
                    <input class="w-20 px-1" type="number" bind:value={viewerWidth} />
                {/if}
            </menu>
        </div>
        <iframe
        foo:bar={1}
            title="viewer"
            class="border-1 border-gray-300 h-full rounded-tl rounded-tr"
            bind:this={viewerEl}
            style:width={viewerWidth ? viewerWidth + 'px' : `100%`}
        />
    </section>
</div>

<style>
    div[data-grid='container'] {
        padding: 1rem;
        display: grid;
        grid-template-columns: 1fr 4fr;
        grid-template-rows: 1fr 1fr;
        grid-gap: 1rem;
        grid-template-areas:
            'a c'
            'b c';
    }

    section[data-grid='a'] {
        grid-area: a;
    }

    section[data-grid='b'] {
        grid-area: b;
    }

    section[data-grid='c'] {
        grid-area: c;
    }

    .viewer-container {
        align-self: stretch;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0.5rem 0;
        overflow: hidden;
        background-color: var(--color-gray-100);
        border: 1px solid var(--color-gray-300);
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
    }

    .btn-width {
        padding: 0.5rem 0.25rem;
    }

    .btn-width.highlight {
        background-color: var(--colors-main-500);
        color: var(--color-text-white);
    }

    .dim {
        opacity: 0.4;
    }
</style>
