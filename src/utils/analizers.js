import {doDateRangesOverlap} from './validators';

function calculateDaysFromDateToDate(dateFrom, dateTo) {
	const diffTime = Math.abs(dateFrom - dateTo);
	const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // convert ms to days
	return diffDays;
}

function getLongestWorkingEmployeePair(array) {
	let pair = {
		employee1: null,
		employee2: null,
		daysWorkedTogether: 0,
	};

	for (let i = 0; i < array.length; i++) {
		const employee1 = array[i];

		for (let j = i + 1; j < array.length; j++) {
			const employee2 = array[j];

			if (employee1.EmpID === employee2.EmpID) continue;

			if (employee1.ProjectID === employee2.ProjectID) {
				if (
					!doDateRangesOverlap(
						employee1.DateFrom,
						employee1.DateTo,
						employee2.DateFrom,
						employee2.DateTo
					)
				) {
					continue;
				}

				const daysWorkedTogether = calculateDaysFromDateToDate(
					employee1.DateFrom,
					employee2.DateTo
				);

				if (daysWorkedTogether > pair.daysWorkedTogether) {
					pair = {
						employee1,
						employee2,
						daysWorkedTogether,
					};
				}
			}
		}
	}

	return pair;
}

export {calculateDaysFromDateToDate, getLongestWorkingEmployeePair};
