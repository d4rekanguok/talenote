<div class="tn-wrapper-logo">
	<div class="tn-logo">
		<svg
			width={32}
			height={32}
			viewBox="0 0 160 160"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M23.4465 98.6507C24.3885 96.437 26.5617 95 28.9675 95H131.033C133.438 95 135.611 96.437 136.553 98.6507L151.447 133.651C153.131 137.608 150.227 142 145.926 142H14.0738C9.77298 142 6.86888 137.608 8.55291 133.651L23.4465 98.6507Z"
				fill="#08194B"
			/>
			<path
				d="M65.6901 58.5843C66.6482 56.4062 68.8028 55 71.1823 55H88.374C90.9734 55 93.2772 56.6738 94.0804 59.146L118.448 134.146C119.708 138.023 116.818 142 112.742 142H38.1938C33.8618 142 30.9575 137.55 32.7016 133.584L65.6901 58.5843Z"
				fill="#08194B"
			/>
			<path
				d="M116.844 24.904C118.873 25.777 119.81 28.1298 118.937 30.1591L83.1638 113.311C82.7865 114.188 82.1078 114.901 81.2505 115.321L68.1182 121.761C67.0169 122.301 65.6936 121.731 65.3284 120.56L60.9733 106.598C60.689 105.686 60.7402 104.703 61.1175 103.826L96.891 20.6744C97.764 18.6451 100.117 17.7077 102.146 18.5808L116.844 24.904Z"
				fill="#3B82F6"
			/>
			<path
				opacity="0.4"
				d="M35 123H125.5"
				stroke="#3B82F6"
				stroke-width="3"
				stroke-linecap="round"
			/>
			<path d="M35 123H66" stroke="#3B82F6" stroke-width="3" stroke-linecap="round" />
		</svg>

		<span>Talenote</span>
	</div>
	<div class="github-link">
		<a target="_blank" href="https://github.com/d4rekanguok/talenote" rel="noreferrer noopener">
			<svg width={24} height={24} viewBox="0 0 16 16">
				<path
					fill-rule="evenodd"
					d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
				/>
			</svg>
		</a>
	</div>
</div>

<style>
    .tn-logo {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
    }

	.tn-wrapper-logo {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100%;
		padding: 0 0.7rem;
		font-weight: 700;
		color: var(--tale-color-fg-b);
		border-bottom-left-radius: 8px;
		border-bottom-right-radius: 8px;
	}

	.tn-wrapper-logo:hover {
		color: var(--tale-color-bg-a);
		background-color: var(--tale-color-fg-a);
	}

	.tn-wrapper-logo svg {
		fill: var(--tale-color-bg-a);
	}
</style>
