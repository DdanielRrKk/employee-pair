import styles from './EmployeeItem.module.css';
import {convertDateToString} from '../../utils/converters';

function EmployeeItem({employee}) {
	console.log('employee', employee);
	const dateFrom = convertDateToString(employee?.DateFrom);
	const dateTo = convertDateToString(employee?.DateTo);
	return (
		<div className={styles.container}>
			<div>
				<p className={styles.header}>EmpID</p>
				<p className={styles.info}>{employee.EmpID}</p>
			</div>
			<div>
				<p className={styles.header}>ProjectID</p>
				<p className={styles.info}>{employee.ProjectID}</p>
			</div>
			<div>
				<p className={styles.header}>DateFrom</p>
				<p className={styles.info}>{dateFrom}</p>
			</div>
			<div>
				<p className={styles.header}>DateTo</p>
				<p className={styles.info}>{dateTo}</p>
			</div>
		</div>
	);
}

export default EmployeeItem;
