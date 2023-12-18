const REGEX_WHITESPACES = /\r\n|\r|\n/;

const CSV_SEPARATOR = ', ';

const DROPDOWN_OPTIONS = [
	{value: 'EmpID', label: 'EmpID'},
	{value: 'ProjectID', label: 'ProjectID'},
	{value: 'DateFrom', label: 'DateFrom'},
	{value: 'DateTo', label: 'DateTo'},
];
const FILTER_OPTIONS = [
	{value: 'working', label: 'Currently Working'},
	{value: 'notWorking', label: 'Finished Working'},
];

const DATE_FORMATS_REGEX_ARRAY = [
	/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/,
	/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/,
	/^[0-9]{4}\/[0-9]{2}\/[0-9]{2}$/,
	/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/,
];

export {REGEX_WHITESPACES, CSV_SEPARATOR, DROPDOWN_OPTIONS, FILTER_OPTIONS, DATE_FORMATS_REGEX_ARRAY};
