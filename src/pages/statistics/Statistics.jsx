import LongestWorkingPair from '../../components/statistics/LongestWorkingPair';
import styles from './Statistics.module.css';

function Statistics() {
	return (
		<div className={styles.container}>
			<h3>Statistics</h3>

			<LongestWorkingPair />
		</div>
	);
}

export default Statistics;
