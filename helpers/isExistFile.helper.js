//@ts-check
import { constants } from "fs";
import {  access } from "fs/promises";

export async function isExistFile(path = '', rights = constants.W_OK | constants.R_OK) {
	try {
		await access(path, rights);
		return true;
	} catch(e) {
		return false;
	}
}