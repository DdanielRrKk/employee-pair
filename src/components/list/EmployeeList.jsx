import React from 'react';
import EmployeeListHeader from './EmployeeListHeader';
import EmployeeItem from '../item/EmployeeItem';
import styles from './List.module.css';

function EmployeeList({employees, selectHandler}) {
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
							<React.Fragment key={index}>
								<EmployeeItem employee={employee} />

								{index < employees.length - 1 && (
									<hr className={styles.divider} />
								)}
							</React.Fragment>
						);
					})
				)}
			</div>
		</div>
	);
}

export default EmployeeList;
