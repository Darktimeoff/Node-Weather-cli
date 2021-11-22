#!/usr/bin/env node
//@ts-check
import { getArgs } from './helpers/index.js';
import { printHelp, printError, printSuccess } from './services/log.service.js';
import { saveKeyVal, getKeyVal } from './services/storage.service.js';

async function saveToken(v = '') {
	try {
		await saveKeyVal('token', v);
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
};

initCLI();