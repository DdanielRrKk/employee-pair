import {REGEX_WHITESPACES, CSV_SEPARATOR} from './constants';
import {isDateNull} from './validators';

function convertCSVToArray(csv) {
	const array = csv.split(REGEX_WHITESPACES).map(item => {
		const fields = sanitazeArray(item.split(CSV_SEPARATOR));
		return {
			EmpID: parseInt(fields[0]),
			ProjectID: parseInt(fields[1]),
			DateFrom: new Date(fields[2]),
			DateTo: isDateNull(fields[3]) ? new Date() : new Date(fields[3]),
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
			DateFrom: new Date(fields[2]),
			DateTo: isDateNull(fields[3]) ? new Date() : new Date(fields[3]),
		};
	});
}

function sanitazeArray(array) {
	return array.map(item => item.trim());
}

export {convertCSVToArray, convertJSONToArray, sanitazeArray};
