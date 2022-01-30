import path from 'path';
import { createAPI } from '$lib';

const taleDir = path.join(import.meta.url, '..').replace('file:', '');
const pathToJson = path.join(taleDir, '_tales.json');
const { post, get, del } = createAPI({ pathToJson });

export { post, get, del };
