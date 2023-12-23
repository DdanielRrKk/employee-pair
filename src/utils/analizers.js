import {doDateRangesOverlap} from './validators';

function calculateDaysFromDateToDate(dateFrom, dateTo) {
	const diffTime = Math.abs(dateFrom - dateTo);
	const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // convert ms to days
	return diffDays;
}

function getLongestWorkingEmployeePairOnSingleProject(array) {
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
						pair: `${employee1.EmpID} - ${employee2.EmpID}`,
						ProjectID: employee1.ProjectID,
						daysWorkedTogether,
					};
				}
			}
		}
	}

	return pair;
}

function getLongestWorkingEmployeePairOnManyProjects(array) {
	const pairs = [];

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
					new Date(employee1.DateFrom),
					new Date(employee2.DateTo)
				);

				pairs.push({
					pairID: `${employee1.EmpID} - ${employee2.EmpID}`,
					ProjectID: employee1.ProjectID,
					daysWorkedTogether: daysWorkedTogether,
				});
			}
		}
	}

	let longestWorkingPair = {
		pairID: null,
		projects: null,
		totalTimeWorked: 0,
	};
	const pairsDurations = [];

	pairs.forEach(pair => {
		let accumulator = 0;
		const projects = [];

		for (let i = 0; i < pairs.length; i++) {
			if (pairs[i].pairID === pair.pairID) {
				accumulator += pairs[i].daysWorkedTogether;
				projects.push({
					ProjectID: pairs[i].ProjectID,
					daysWorkedTogether: pairs[i].daysWorkedTogether,
				});
			}
		}

		const temp = {
			pairID: pair.pairID,
			projects: projects,
			totalTimeWorked: accumulator,
		};

		if (temp.totalTimeWorked > longestWorkingPair.totalTimeWorked) {
			longestWorkingPair = temp;
		}

		pairsDurations.push(temp);
	});

	return longestWorkingPair;
}

export {
	calculateDaysFromDateToDate,
	getLongestWorkingEmployeePairOnSingleProject,
	getLongestWorkingEmployeePairOnManyProjects,
};
