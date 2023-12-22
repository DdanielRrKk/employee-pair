import {useState, useEffect} from 'react';
import {useEmployee} from '../../hooks/useEmployees';
import {
	getLongestWorkingEmployeePairOnSingleProject,
	getLongestWorkingEmployeePairOnManyProjects,
} from '../../utils/analizers';
import styles from './Statistics.module.css';

function LongestWorkingPair() {
	const {state} = useEmployee();
	const [longestWorkingEmployeePairOnManyProjects, setLongestWorkingEmployeePairOnManyProjects] = useState(null);
	const [longestWorkingEmployeePairOnSingleProject, setLongestWorkingEmployeePairOnSingleProject] =
		useState(null);

	useEffect(() => {
		const pairs = getLongestWorkingEmployeePairOnManyProjects(state);
		const pair = getLongestWorkingEmployeePairOnSingleProject(state);

		console.log('LongestWorkingPair', pairs, pair);

		setLongestWorkingEmployeePairOnManyProjects(pairs);
		setLongestWorkingEmployeePairOnSingleProject(pair);
	}, [state]);

	return (
		<div className={styles.pair}>
			<div>
				<h4>Longest Working Employee Pair On a Single Project:</h4>
				{longestWorkingEmployeePairOnSingleProject?.employee1 === null ||
				longestWorkingEmployeePairOnSingleProject?.employee2 === null ? (
					<p>No pairs found</p>
				) : (
					<>
						<div className={styles.pairInfo}>
							<p>Pair:</p>
							<span>
								{
									longestWorkingEmployeePairOnSingleProject
										?.employee1.EmpID
								}
								{' - '}
								{
									longestWorkingEmployeePairOnSingleProject
										?.employee2.EmpID
								}
							</span>
						</div>

						<p>
							Worked together for:{' '}
							<span>
								{
									longestWorkingEmployeePairOnSingleProject?.daysWorkedTogether
								}
							</span>{' '}
							days
						</p>
					</>
				)}
			</div>

			<div>
				<h4>Longest Working Employee Pair On Many Projects:</h4>
				{longestWorkingEmployeePairOnSingleProject?.employee1 === null ||
				longestWorkingEmployeePairOnSingleProject?.employee2 === null ? (
					<p>No pairs found</p>
				) : (
					<>
						<div className={styles.pairInfo}>
							<p>Pair:</p>
							<span>{longestWorkingEmployeePairOnManyProjects?.pairID}</span>
						</div>

						<p>
							Worked together for:{' '}
							<span>
								{
									longestWorkingEmployeePairOnManyProjects?.totalTimeWorked
								}
							</span>{' '}
							days
						</p>

						<div>
							<p>Projects:</p>
							{longestWorkingEmployeePairOnManyProjects?.projects.map(
								project => (
									<p key={project.ProjectID}>
										{project.ProjectID} -{' '}
										{project.daysWorkedTogether} days
									</p>
								)
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default LongestWorkingPair;
