import EmployeeTable from '../table/EmployeeTable/EmployeeTable';

import styles from './StatisticsPanel.module.css';

function StatisticsPanel({pair}) {
	const tempArray = [pair?.employee1, pair?.employee2];
	return (
		<div className={styles.container}>
			<h2>Longest working employee pair</h2>
			<h3>Duration: {pair?.daysWorkedTogether} days</h3>
			<EmployeeTable employees={tempArray} />
		</div>
	);
}

export default StatisticsPanel;
