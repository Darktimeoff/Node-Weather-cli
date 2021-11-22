#!/usr/bin/env node
//@ts-check
import { TOKEN_DICTIONARY } from './conts.js';
import { getArgs } from './helpers/index.js';
import { getWeather } from './services/api.service.js';
import { printHelp, printError, printSuccess } from './services/log.service.js';
import { saveKeyVal } from './services/storage.service.js';

async function saveToken(v = '') {
	if(!v.length) {
		printError('Не передан токен');
		return;
	}

	try {
		await saveKeyVal(TOKEN_DICTIONARY.token, v);
		printSuccess('Токен сохранен')
	} catch (e) {
		printError(e.message);
	}
}

const initCLI = async () => {
	const args = getArgs(process.argv);
	
	if(args.h) {
		printHelp()
	}

	if(args.t) {
		return saveToken(args.t);
	}

	getWeather('kiev');
};

initCLI();