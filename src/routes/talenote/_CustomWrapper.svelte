<div class="wrapper">
	<div class="sizer">
		<slot />
	</div>
</div>

<style>
	.wrapper {
        position: relative;
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: center;
		background: lightblue;
	}

    .sizer {
        max-width: 300px;
    }
</style>
