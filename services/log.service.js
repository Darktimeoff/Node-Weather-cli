import chalk from 'chalk';
import dedent from 'dedent-js';

export function printError(error) {
	console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

export function printSuccess(message) {
	console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

export function printHelp() {
	console.log(
		dedent`
		${chalk.bgCyan(' HELP ')}
		Без параметров - вывод погоды
		-s [CITY] для установки города
		-h для вывода помощи
		-t [API_KEY] для сохранение токена 
	`)
}

export function printWeather(res, icon) {
	console.log(
		dedent`
			${chalk.bgYellow(' WEATHER ')} Погода в ${res.name}
			${res.weather[0].description}
			Температура: ${res.main.temp} (ощущается как ${res.main.feels_like})
			Влажность: ${res.main.humidity}%
			Давление: ${res.main.pressure} мм рт.
			Cкорость ветра: ${res.wind.speed} м/c
		`
	)
}