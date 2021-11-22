//@ts-check
import { homedir } from "os";
import { join } from 'path';
import { writeFile, readFile } from "fs/promises";
import {isExistFile} from '../helpers/index.js';

const filePath = join(homedir(), 'weather-data.json');

export async function saveKeyVal(key = '', val = '') {
	let data = {};

	if(await isExistFile(filePath)) {
		const file = await readFile(filePath, {encoding: 'utf8'});
		data = JSON.parse(file);
	}

	data[key] = val;
	
	await writeFile(filePath, JSON.stringify(data));
}


export async function getKeyVal(key = '') {
	return  JSON.parse(await readFile(filePath, {encoding: 'utf8'}))[key] || undefined;
}