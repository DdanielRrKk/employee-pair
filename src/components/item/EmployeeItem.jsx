import styles from './EmployeeItem.module.css';

function EmployeeItem({employee}) {
	const dateFrom = employee?.DateFrom.toLocaleDateString();
	const dateTo = employee?.DateTo.toLocaleDateString();
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<p>EmpID:</p>
				<p>ProjectID:</p>
				<p>DateFrom:</p>
				<p>DateTo:</p>
			</div>

			<div className={styles.info}>
				<p>{employee.EmpID}</p>
				<p>{employee.ProjectID}</p>
				<p>{dateFrom}</p>
				<p>{dateTo}</p>
			</div>
		</div>
	);
}

export default EmployeeItem;
