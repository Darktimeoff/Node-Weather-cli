#!/usr/bin/env node
//@ts-check
import { TOKEN_DICTIONARY } from './conts.js';
import { getArgs } from './helpers/index.js';
import { getWeather } from './services/api.service.js';
import { printHelp, printError, printSuccess } from './services/log.service.js';
import { saveKeyVal, getKeyVal } from './services/storage.service.js';

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

async function saveCity(city = '') {
	if(!city.length) {
		printError('Не передан город')
	}

	try {
		await saveKeyVal(TOKEN_DICTIONARY.city, city);
		printSuccess('Город сохранен')
	} catch(e) {
		printError(e.message);
	}
}

async function getForcast() {
	try {
		const city = process.env.city || await getKeyVal(TOKEN_DICTIONARY.city);

		if(!city.trim()) {
			printError('Введите пожалуйста город -s [CITY]')
			return;
		}

		const weather = await getWeather(city);
		console.log(weather)
	} catch(e) {
		const cod = e?.response?.data.cod;

		if(cod == 401) printError('Неверный токен, проверьте его');
		else if(cod == 404) printError('Неверный город');
		else if(e.code == 'ENOENT') {
			printError('Введите пожалуйста токен и город\n');
			printHelp();
		} else printError(e.message)
	}
}

const initCLI = async () => {
	const args = getArgs(process.argv);

	if(args.h) {
		printHelp()
	}

	if(args.s) {
		await saveCity(args.s);
	}

	if(args.t) {
		return await saveToken(args.t);
	}

	getForcast();
};

initCLI();