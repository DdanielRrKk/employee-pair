import {REGEX_WHITESPACES, DATE_FORMATS_REGEX_ARRAY} from './constants';

function isCSVValid(csv) {
	const array = csv.split(REGEX_WHITESPACES);
	return array.length > 0;
}

function isJSONValid(json) {
	try {
		JSON.parse(json);
		return true;
	} catch (error) {
		return false;
	}
}

function isDateValid(date) {
	try {
		return !isNaN(Date.parse(date));
	} catch (error) {
		return false;
	}
}

function isDateNull(date) {
	return date === 'NULL' || date === null;
}

function doDateRangesOverlap(aStart, aEnd, bStart, bEnd) {
	if (aStart > bEnd || aEnd < bStart) return false; // a started after b sended or b started after a ended
	return true;
}

function isDateStringValid(dateString) {
	let flag = false;
	for (const format of DATE_FORMATS_REGEX_ARRAY) {
		const pattern = new RegExp(format);

		if (pattern.test(dateString)) {
			flag = true;
		}
	}
	return flag;
}

function isDateValuesValid(day, month, year) {
	if (year < 0 || year > 9999) {
		console.error('Invalid year');
		return false;
	}

	if (month < 0 || month > 11) {
		console.error('Invalid month');
		return false;
	}

	if (day < 1 || day > new Date(year, month + 1, 0).getDate()) {
		console.error('Invalid day');
		return false;
	}

	return true;
}

export {isCSVValid, isJSONValid, isDateValid, isDateNull, doDateRangesOverlap, isDateStringValid, isDateValuesValid};
