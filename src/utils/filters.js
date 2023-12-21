import {convertDateToString} from './converters';

function filterArrayBasedOnOption(array, option) {
	switch (option) {
		case 'none':
			return array;
		case 'working':
			return filterArrayOnlyCurrentlyWorking(array);
		case 'notWorking':
			return filterArrayOnlyNotWorking(array);
		default:
			return array;
	}
}

function filterArrayOnlyCurrentlyWorking(array) {
	return array.filter(employee => {
		const today = new Date();
		const dateTo = new Date(employee.DateTo);
		return (
			dateTo.getDate() === today.getDate() &&
			dateTo.getMonth() === today.getMonth() &&
			dateTo.getFullYear() === today.getFullYear()
		);
	});
}

function filterArrayOnlyNotWorking(array) {
	return array.filter(employee => {
		const today = new Date();
		const dateTo = new Date(employee.DateTo);
		return !(
			dateTo.getDate() === today.getDate() &&
			dateTo.getMonth() === today.getMonth() &&
			dateTo.getFullYear() === today.getFullYear()
		);
	});
}

function filterArrayByValueInProperty(array, property, value) {
	return array.filter(employee => {
		if (employee[property] instanceof Date) {
			return convertDateToString(employee[property]).startsWith(value);
		}
		return employee[property].toString().startsWith(value);
	});
}

export {
	filterArrayOnlyCurrentlyWorking,
	filterArrayOnlyNotWorking,
	filterArrayByValueInProperty,
	filterArrayBasedOnOption,
};
