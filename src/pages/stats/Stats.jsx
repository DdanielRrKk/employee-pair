import {useState, useEffect} from 'react';
import {useEmployee} from '../../hooks/useEmployees';
import StatisticsPanel from '../../components/statisticsPanel/StatisticsPanel';
import {getLongestWorkingEmployeePair} from '../../utils/analizers';
import styles from './Stats.module.css';

function Stats() {
	const {state} = useEmployee();

	const [longestWorkingEmployeePair, setLongestWorkingEmployeePair] = useState(null);

	useEffect(() => {
		const pair = getLongestWorkingEmployeePair(state);
		setLongestWorkingEmployeePair(pair);
		console.log(pair);
	}, [state]);

	return (
		<div className={styles.container}>
			<StatisticsPanel pair={longestWorkingEmployeePair} />
		</div>
	);
}

export default Stats;
