import styles from './EmployeeItem.module.css';

function EmployeeItem({employee}) {
	const dateFrom = employee?.DateFrom.toLocaleDateString();
	const dateTo = employee?.DateTo.toLocaleDateString();
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
