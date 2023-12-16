import {REGEX_WHITESPACES, CSV_SEPARATOR} from './constants';

function convertCSVToArray(csv) {
	const array = csv.split(REGEX_WHITESPACES).map(item => {
		const fields = sanitazeArray(item.split(CSV_SEPARATOR));
		return {
			EmpID: parseInt(fields[0]),
			ProjectID: parseInt(fields[1]),
			DateFrom: fields[2],
			DateTo: fields[3],
		};
	});
	return array;
}

function convertJSONToArray(json) {
	return JSON.parse(json);
}

function sanitazeArray(array) {
	console.log('sanatize: ', array);
	return array.map(item => item.trim());
}

export {convertCSVToArray, convertJSONToArray, sanitazeArray};
