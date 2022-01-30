import type { RequestHandler } from '@sveltejs/kit';
import { nanoid } from 'nanoid';
import { Low, JSONFile } from 'lowdb';

interface CreateAPIArgs {
	pathToJson: string;
}

/* TODO type this better */
interface CreateAPIReturns {
	post: RequestHandler;
	get: RequestHandler;
	del: RequestHandler;
}

export const createAPI = ({ pathToJson }: CreateAPIArgs): CreateAPIReturns => {
	const adapter = new JSONFile(pathToJson);
	const db = new Low(adapter);

	const post: RequestHandler = async ({ request }) => {
		const body = await request.json()
		const { id, tale, name } = body;
		if (!id || !tale || Object.keys(tale).length === 0) {
			return {
				status: 404
			};
		}

		await db.read();
		const data = db.data;
		tale._taleid = nanoid(6);
		if (name && name.length > 0) {
			tale._talename = name;
		}
		data[id] ? data[id].push(tale) : (data[id] = [tale]);
		await db.write();
		return {
			status: 200,
			body: tale
		};
	};

	const get: RequestHandler = async ({ url }) => {
		const id = url.searchParams.get('id');
		await db.read();
		const data = db.data;

		if (id === 'all') {
			return {
				status: 200,
				headers: {
					'Content-Type': 'application/json'
				},
				body: data
			};
		} else {
			const tales = data[id];

			return {
				status: 200,
				headers: {
					'Content-Type': 'application/json'
				},
				body: tales
			};
		}
	};

	const del: RequestHandler = async ({ url }) => {
		const id = url.searchParams.get('id');
		const taleId = url.searchParams.get('taleId');
		await db.read();
		const data = db.data;

		const taleIndex = data[id]?.findIndex((_tale) => _tale._taleid === taleId);
		let deletedTale;
		if (taleIndex > -1) {
			[deletedTale] = data[id].splice(taleIndex, 1);
			await db.write();
			return {
				status: 200,
				body: deletedTale
			};
		} else {
			return {
				status: 404
			};
		}
	};

	return {
		post,
		get,
		del
	};
};
