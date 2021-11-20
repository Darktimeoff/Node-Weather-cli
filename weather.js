#!/usr/bin/env node
import {getArgs} from './helpers/index.js';

const initCLI = () => {
	const args = getArgs(process.argv);
	console.log(args)
};

initCLI();