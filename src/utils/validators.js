import {REGEX_WHITESPACES} from './constants';

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

export {isCSVValid, isJSONValid, isDateValid, isDateNull, doDateRangesOverlap};
