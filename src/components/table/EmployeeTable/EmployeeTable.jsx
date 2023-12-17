import EmployeeRow from '../EmployeeRow/EmployeeRow';
import styles from './EmployeeTable.module.css';

function EmployeeTable({employees = []}) {
	return (
		<table className={styles.table}>
			<thead>
				<tr>
					<th>EmpID</th>
					<th>ProjectID</th>
					<th>DateFrom</th>
					<th>DateTo</th>
				</tr>
			</thead>
			<tbody>
				{employees.map((employee, index) => (
					<EmployeeRow
						key={index}
						employee={employee}
					/>
				))}
			</tbody>
		</table>
	);
}

export default EmployeeTable;
