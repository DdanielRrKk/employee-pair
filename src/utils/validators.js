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

export {isCSVValid, isJSONValid};
