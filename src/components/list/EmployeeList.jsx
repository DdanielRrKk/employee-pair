import {useState} from 'react';
import EmployeeListHeader from './EmployeeListHeader';
import EmployeeItem from '../item/EmployeeItem';
import styles from './List.module.css';

function EmployeeList({employees, selectHandler}) {
	// const [sortOption, setSortOption] = useState('EmpID');
	return (
		<div className={styles.container}>
			<EmployeeListHeader
				count={employees.length}
				selectHandler={selectHandler}
			/>

			<div className={styles.content}>
				{employees.length === 0 ? (
					<div className={styles.noData}>No data</div>
				) : (
					employees.map((employee, index) => {
						return (
							<EmployeeItem
								key={index}
								employee={employee}
							/>
						);
					})
				)}
			</div>
		</div>
	);
}

export default EmployeeList;
