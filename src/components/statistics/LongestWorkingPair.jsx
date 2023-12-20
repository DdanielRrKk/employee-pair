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
		console.log(pair);
	}, [state]);

	return (
		<div className={styles.pair}>
			<h4>Longest working employee pair:</h4>
			{longestWorkingEmployeePair?.employee1 === null ||
			longestWorkingEmployeePair?.employee2 === null ? (
				<p>No pair</p>
			) : (
				<>
					<p>
						Employee 1: <span>{longestWorkingEmployeePair?.employee1.EmpID}</span>
					</p>
					<p>
						Employee 2: <span>{longestWorkingEmployeePair?.employee2.EmpID}</span>
					</p>
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
