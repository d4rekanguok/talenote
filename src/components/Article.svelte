<script context="module">
	export const defaultProps = {
		title: 'A long title',
		description: 'Hello, a description for you'
	};

	export const taleWrapper = 'custom';
</script>

<script>
	export let title = defaultProps.title;
	export let description = defaultProps.description;
</script>

<article class="card">
	<header>
		<h1>{title}</h1>
		<p>{description}</p>
	</header>
    <img src="https://placekitten.com/300" alt="a cute cat" />
</article>

<style>
	.card {
		width: 100%;
		box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.2);
        font-family: sans-serif;
        border-radius: 12px;
        background-color: white;
        display: inline-flex;
        flex-direction: column;
        overflow: hidden;
	}

    .card header {
        padding: 1rem;
        order: 2;
    }

    .card img {
        order: 1;
    }
</style>
