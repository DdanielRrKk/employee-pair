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

function filterarrayOnlyNotWorking(array) {
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
	return array.filter(employee => employee[property].toString().startsWith(value));
}

export {filterArrayOnlyCurrentlyWorking, filterarrayOnlyNotWorking, filterArrayByValueInProperty};
