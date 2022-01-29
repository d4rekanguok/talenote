import type { RequestHandler } from '@sveltejs/kit';
import path from 'path';
import { nanoid } from 'nanoid';
import { Low, JSONFile } from 'lowdb';

const taleDir = path.join(import.meta.url, '..').replace('file:', '');
const pathToJson = path.join(taleDir, '_tales.json');
const adapter = new JSONFile(pathToJson);
const db = new Low(adapter);

export const post: RequestHandler = async (event) => {
	const { body } = event;
	// @ts-expect-error dont know how to type this :(
	const { id, tale } = body;
	await db.read();
	const data = db.data;
	tale.id = nanoid(6);
	data[id] ? data[id].push(tale) : (data[id] = [tale]);
	await db.write();
	return {
		status: 200,
		body: tale
	};
};

export const get: RequestHandler = async (event) => {
	const { url } = event;
	const id = url.searchParams.get('id');
	await db.read();
	const data = db.data;
	const tales = data[id];

	return {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		},
		body: tales
	};
};

export const del: RequestHandler = async (event) => {
	const { url } = event;
	const id = url.searchParams.get('id');
	const taleId = url.searchParams.get('taleId');
	await db.read();
	const data = db.data;

	const taleIndex = data[id]?.findIndex((_tale) => _tale.id === taleId);
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