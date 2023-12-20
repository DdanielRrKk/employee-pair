import LongestWorkingPair from './LongestWorkingPair';

import styles from './Statistics.module.css';

function StatisticsPanel() {
	return (
		<div className={styles.container}>
			<h3>STATISTICS</h3>

			<LongestWorkingPair />
		</div>
	);
}

export default StatisticsPanel;
