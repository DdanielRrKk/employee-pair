import styles from './EmployeeRow.module.css';

function EmployeeRow({employee}) {
	const dateFrom = employee?.DateFrom.toLocaleDateString();
	const dateTo = employee?.DateTo.toLocaleDateString();
	return (
		<tr>
			<td>{employee?.EmpID}</td>
			<td>{employee?.ProjectID}</td>
			<td>{dateFrom}</td>
			<td>{dateTo}</td>
		</tr>
	);
}

export default EmployeeRow;
