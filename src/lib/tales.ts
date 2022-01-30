import { writable } from 'svelte/store';

const createTales = () => {
	const { subscribe, update } = writable({});

	const get = async () => {
		const res = await fetch('/talenote/tales?id=all');
		const data = await res.json();
		update(() => data);
	};

	const create = async ({ id, tale, name = '' }) => {
		const res = await fetch('/talenote/tales', {
			method: 'POST',
			body: JSON.stringify({ id, tale, name }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (res.status === 200) {
			get();
		}
	};

	const del = async ({ id, taleId }) => {
		const params = new URLSearchParams({ id, taleId });
		const res = await fetch(`/talenote/tales?${params}`, {
			method: 'DELETE'
		});

		if (res.status === 200) {
			get();
		}
	};

	return {
		subscribe,
		create,
		get,
		del
	};
};

export const tales = createTales();
