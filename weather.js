#!/usr/bin/env node
import {getArgs} from './helpers/index.js';
import { printHelp } from './services/log.service.js';

const initCLI = () => {
	const args = getArgs(process.argv);
	
	if(args.h) {
		printHelp('HELP')
	}

	if(args.t) {
		saveKeyVal('token', args.t);
	}
};

initCLI();