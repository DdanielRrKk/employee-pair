import {useState, useEffect} from 'react';

import {convertCSVToArray, convertJSONToArray} from '../../utils/converters';
import {getLongestWorkingEmployeePair} from '../../utils/analizers';

import FileInput from '../../components/input/FileInput';
import EmployeeList from '../../components/list/EmployeeList';
import FilterPanel from '../../components/filter/Filter';

import {FILTER_OPTIONS} from '../../utils/constants';

import {useEmployee} from '../../hooks/useEmployees';

import styles from './Home.module.css';

function Home() {
	const {state, setEmployees} = useEmployee();
	console.log('state: ', state);

	const [employeeArray, setEmployeeArray] = useState([]);
	const [longestWorkingEmployeePair, setLongestWorkingEmployeePair] = useState(null);
	const [selectedFilter, setSelectedFilter] = useState(null);
	const [selectedOption, setSelectedOption] = useState(null);

	useEffect(() => {
		const pair = getLongestWorkingEmployeePair(employeeArray);
		setLongestWorkingEmployeePair(pair);
		console.log(pair);
	}, [employeeArray]);

	const handleFileUpload = e => {
		e.preventDefault();
		const file = e.target.files[0];
		if (!file) return;

		const fileExtension = file.name.split('.').pop().toLowerCase();
		const reader = new FileReader();
		switch (fileExtension) {
			case 'csv':
				reader.onload = e => {
					const array = convertCSVToArray(reader.result);
					setEmployeeArray(array);
					setEmployees(array);
				};
				break;
			case 'json':
				reader.onload = e => {
					const array = convertJSONToArray(reader.result);
					setEmployeeArray(array);
					setEmployees(array);
				};
				break;
			default:
				throw new Error('Not supported file type');
		}
		reader.readAsText(e.target.files[0]);
	};

	function handleFilterChange(selectedValue) {
		setSelectedFilter(selectedValue);

		switch (selectedValue) {
			case 'all':
				setEmployeeArray(state);
				break;
			case 'working':
				setEmployeeArray(
					state.filter(employee => {
						const today = new Date();
						const dateTo = new Date(employee.DateTo);
						return (
							dateTo.getDate() === today.getDate() &&
							dateTo.getMonth() === today.getMonth() &&
							dateTo.getFullYear() === today.getFullYear()
						);
					})
				);
				break;
			case 'notWorking':
				setEmployeeArray(
					state.filter(employee => {
						const today = new Date();
						const dateTo = new Date(employee.DateTo);
						return !(
							dateTo.getDate() === today.getDate() &&
							dateTo.getMonth() === today.getMonth() &&
							dateTo.getFullYear() === today.getFullYear()
						);
					})
				);
				break;
			default:
				throw new Error('Not supported filter type');
		}
	}

	function handleResetFilters() {
		setSelectedFilter(null);
	}

	function handleSelectOption(value) {
		setSelectedOption(value);

		switch (value) {
			case 'EmpID':
				setEmployeeArray(employeeArray.sort((a, b) => a.EmpID - b.EmpID));
				break;
			case 'ProjectID':
				setEmployeeArray(employeeArray.sort((a, b) => a.ProjectID - b.ProjectID));
				break;
			case 'DateFrom':
				setEmployeeArray(
					employeeArray.sort((a, b) => {
						if (a.DateFrom > b.DateFrom) return 1;
						if (a.DateFrom < b.DateFrom) return -1;
						return 0;
					})
				);
				break;
			case 'DateTo':
				setEmployeeArray(
					employeeArray.sort((a, b) => {
						if (a.DateTo > b.DateTo) return 1;
						if (a.DateTo < b.DateTo) return -1;
						return 0;
					})
				);
				break;
			case 'none':
				setEmployeeArray(state);
				break;
			default:
				throw new Error('Not supported sort type');
		}
	}

	return (
		<div className={styles.container}>
			<h1>Employee Pairs</h1>
			<FileInput uploadHandler={handleFileUpload} />

			{!!employeeArray && (
				<div className={styles.content}>
					<FilterPanel
						options={FILTER_OPTIONS}
						filterHandler={handleFilterChange}
						resetHandler={handleResetFilters}
					/>

					<EmployeeList
						employees={employeeArray}
						selectHandler={handleSelectOption}
					/>
				</div>
			)}
		</div>
	);
}

export default Home;
