import {REGEX_WHITESPACES, CSV_SEPARATOR} from './constants';
import {
	areDatesFromAndToValid,
	isDateParsedCorrectly,
	isDateNull,
	isDateStringValid,
	isDateValuesValid,
	isNumberValid,
} from './validators';

function convertCSVToArray(csv) {
	const array = sanitazeArray(
		csv.split(REGEX_WHITESPACES).map(item => {
			const fields = sanitazeFields(item.split(CSV_SEPARATOR));

			if (!isNumberValid(fields[0]) || !isNumberValid(fields[1])) {
				return null;
			}

			let parsedData = {};
			try {
				parsedData = {
					EmpID: parseInt(fields[0]),
					ProjectID: parseInt(fields[1]),
					DateFrom: parseDate(fields[2]),
					DateTo: parseDate(fields[3]),
				};
			} catch (error) {
				console.error(error);
				return null;
			}

			if (!isDateParsedCorrectly(parsedData.DateFrom) || !isDateParsedCorrectly(parsedData.DateTo)) {
				return null;
			}

			if (!areDatesFromAndToValid(parsedData.DateFrom, parsedData.DateTo)) {
				return null;
			}

			return parsedData;
		})
	);
	return array;
}

function convertJSONToArray(json) {
	const array = sanitazeArray(
		JSON.parse(json).map(item => {
			const fields = sanitazeFields(Object.values(item));

			if (!isNumberValid(fields[0]) || !isNumberValid(fields[1])) {
				return null;
			}

			let parsedData = {};
			try {
				parsedData = {
					EmpID: parseInt(fields[0]),
					ProjectID: parseInt(fields[1]),
					DateFrom: parseDate(fields[2]),
					DateTo: parseDate(fields[3]),
				};
			} catch (error) {
				console.error(error);
				return null;
			}

			if (!isDateParsedCorrectly(parsedData.DateFrom) || !isDateParsedCorrectly(parsedData.DateTo)) {
				return null;
			}

			if (!areDatesFromAndToValid(parsedData.DateFrom, parsedData.DateTo)) {
				return null;
			}

			return parsedData;
		})
	);
	return array;
}

function sanitazeArray(array) {
	return array.filter(item => item !== null);
}

function sanitazeFields(fields) {
	return fields.map(item => {
		if (!isNaN(item)) {
			return item;
		}
		return item.trim();
	});
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

function convertDateToString(date) {
	return `${date.getFullYear()}-${date.getMonth() < 10 ? '0' : ''}${date.getMonth() + 1}-${
		date.getDate() < 10 ? '0' : ''
	}${date.getDate()}`;
}

export {convertCSVToArray, convertJSONToArray, sanitazeArray, convertDateToString};
