import axios from "axios";
import { TOKEN_DICTIONARY } from "../conts.js";
import { getKeyVal } from "./storage.service.js";

export async function getWeather(cityParams) {
	const token = await getKeyVal(TOKEN_DICTIONARY.token);
	
	if(!token) {
		throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]')
	}

	const city  = cityParams || await getKeyVal(TOKEN_DICTIONARY.city);

	if(!city) {
		throw new Error('Не задан город, задайте его через команду -s [CITY]')
	}
	
	const params = {
		q: city,
		appid: token,
		lang: 'ru',
		unit: 'metric'
	}

	const {data} = await axios.get('https://api.openweathermap.org/data/2.5/weather', {params});

	return data;
};