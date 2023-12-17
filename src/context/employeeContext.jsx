import {useReducer, createContext} from 'react';

const SET_EMPLOYEES = 'SET_EMPLOYEES';
const ADD_EMPLOYEES = 'ADD_EMPLOYEES';

const EmployeeContext = createContext();

function reducer(state, action) {
	switch (action.type) {
		case SET_EMPLOYEES:
			return [...action.payload];
		case ADD_EMPLOYEES:
			return [...state, action.payload];
		default:
			throw new Error();
	}
}

const initialState = [];

function EmployeeProvider({children}) {
	const [state, dispatch] = useReducer(reducer, initialState);

	function setEmployees(employees) {
		dispatch({type: SET_EMPLOYEES, payload: employees});
	}
	function addEmployee(employee) {
		dispatch({type: ADD_EMPLOYEES, payload: employee});
	}

	const value = {
		state,
		setEmployees,
		addEmployee,
	};

	return <EmployeeContext.Provider value={value}>{children}</EmployeeContext.Provider>;
}

export {EmployeeContext, EmployeeProvider};
