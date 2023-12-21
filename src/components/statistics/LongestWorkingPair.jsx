import {useState, useEffect} from 'react';
import {useEmployee} from '../../hooks/useEmployees';
import {getLongestWorkingEmployeePair} from '../../utils/analizers';
import styles from './Statistics.module.css';

function LongestWorkingPair() {
	const {state} = useEmployee();
	const [longestWorkingEmployeePair, setLongestWorkingEmployeePair] = useState(null);

	useEffect(() => {
		const pair = getLongestWorkingEmployeePair(state);
		setLongestWorkingEmployeePair(pair);
	}, [state]);

	return (
		<div className={styles.pair}>
			<h4>Longest Working Employee Pair:</h4>
			{longestWorkingEmployeePair?.employee1 === null ||
			longestWorkingEmployeePair?.employee2 === null ? (
				<p>No pair has worked together</p>
			) : (
				<>
					<div className={styles.pairInfo}>
						<p>Employee 1:</p>
						<span>{longestWorkingEmployeePair?.employee1.EmpID}</span>
					</div>

					<div className={styles.pairInfo}>
						<p>Employee 2:</p>
						<span>{longestWorkingEmployeePair?.employee2.EmpID}</span>
					</div>

					<p>
						Worked together for:{' '}
						<span>{longestWorkingEmployeePair?.daysWorkedTogether}</span> days
					</p>
				</>
			)}
		</div>
	);
}

export default LongestWorkingPair;
