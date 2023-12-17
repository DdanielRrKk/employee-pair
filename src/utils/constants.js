const REGEX_WHITESPACES = /\r\n|\r|\n/;

const CSV_SEPARATOR = ', ';

const SORT_DROPDOWN_OPTIONS = [
	{value: 'EmpID', label: 'EmpID'},
	{value: 'ProjectID', label: 'ProjectID'},
	{value: 'DateFrom', label: 'DateFrom'},
	{value: 'DateTo', label: 'DateTo'},
];
const FILTER_OPTIONS = [
	{value: 'all', label: 'All'},
	{value: 'working', label: 'Currently Working'},
	{value: 'notWorking', label: 'Finished Working'},
];

export {REGEX_WHITESPACES, CSV_SEPARATOR, SORT_DROPDOWN_OPTIONS, FILTER_OPTIONS};
