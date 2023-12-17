import {useContext} from 'react';
import {EmployeeContext} from '../context/employeeContext';

function useEmployee() {
	const context = useContext(EmployeeContext);
	if (!context) {
		throw new Error('useEmployees must be used within a EmployeeProvider');
	}
	return context;
}

export {useEmployee};
