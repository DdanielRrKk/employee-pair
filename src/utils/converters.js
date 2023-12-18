import {REGEX_WHITESPACES, CSV_SEPARATOR} from './constants';
import {isDateNull, isDateStringValid, isDateValuesValid} from './validators';

function convertCSVToArray(csv) {
	const array = csv.split(REGEX_WHITESPACES).map(item => {
		const fields = sanitazeArray(item.split(CSV_SEPARATOR));
		return {
			EmpID: parseInt(fields[0]),
			ProjectID: parseInt(fields[1]),
			DateFrom: parseDate(fields[2]),
			DateTo: parseDate(fields[3]),
		};
	});
	return array;
}

function convertJSONToArray(json) {
	return JSON.parse(json).map(item => {
		const fields = Object.values(item);
		return {
			EmpID: parseInt(fields[0]),
			ProjectID: parseInt(fields[1]),
			DateFrom: parseDate(fields[2]),
			DateTo: parseDate(fields[3]),
		};
	});
}

function sanitazeArray(array) {
	return array.map(item => item.trim());
}

function parseDate(dateString) {
	if (isDateNull(dateString)) {
		return new Date();
	}

	if (!isDateStringValid(dateString)) {
		console.error(`Invalid date format: ${dateString}`);
		return null;
	}

	const parts = dateString.split(/[^0-9]/);
	let dateObj = {};

	if (parts[0].length === 4) {
		dateObj = {
			year: parseInt(parts[0]),
			month: parseInt(parts[1]),
			day: parseInt(parts[2]),
		};
	}
	if (parts[2].length === 4) {
		dateObj = {
			year: parseInt(parts[2]),
			month: parseInt(parts[1]),
			day: parseInt(parts[0]),
		};
	}

	if (dateObj.month < 1 || dateObj.month > 12) {
		const month = dateObj.month;
		dateObj.month = dateObj.day;
		dateObj.day = month;
	}

	if (!isDateValuesValid(dateObj.day, dateObj.month - 1, dateObj.year)) {
		return null;
	}

	return new Date(dateObj.year, dateObj.month - 1, dateObj.day);
}

export {convertCSVToArray, convertJSONToArray, sanitazeArray};
