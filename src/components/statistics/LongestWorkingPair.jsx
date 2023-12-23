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
							<span>{longestWorkingEmployeePairOnSingleProject?.pair}</span>
						</div>
						<div className={styles.pairInfo}>
							<p>Project:</p>
							<span>
								{longestWorkingEmployeePairOnSingleProject?.ProjectID}
							</span>
						</div>

						<p>
							Worked together for:
							<span className={styles.days}>
								{` ${longestWorkingEmployeePairOnSingleProject?.daysWorkedTogether} `}
							</span>
							days
						</p>
					</>
				)}
			</div>

			<div>
				<h4>Longest Working Employee Pair On Multiple Projects:</h4>
				{longestWorkingEmployeePairOnSingleProject?.employee1 === null ||
				longestWorkingEmployeePairOnSingleProject?.employee2 === null ? (
					<p>No pairs found</p>
				) : (
					<>
						<div className={styles.pairInfo}>
							<p>Pair:</p>
							<span>{longestWorkingEmployeePairOnManyProjects?.pairID}</span>
						</div>

						<div className={styles.pairInfo}>
							<p>Projects:</p>
							{longestWorkingEmployeePairOnManyProjects?.projects.map(
								(project, index) => (
									<div
										key={index}
										className={styles.pairInfo}
									>
										<span>{project?.ProjectID}</span>

										<p>
											For:
											<span className={styles.days}>
												{` ${project?.daysWorkedTogether} `}
											</span>
											days
										</p>
									</div>
								)
							)}
						</div>

						<p>
							Total time:
							<span className={styles.days}>
								{` ${longestWorkingEmployeePairOnManyProjects?.totalTimeWorked} `}
							</span>
							days
						</p>
					</>
				)}
			</div>
		</div>
	);
}

export default LongestWorkingPair;
