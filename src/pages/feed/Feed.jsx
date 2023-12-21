import {useEffect, useState} from 'react';
import {useEmployee} from '../../hooks/useEmployees';

import FileInput from '../../components/input/FileInput';
import EmployeeList from '../../components/list/EmployeeList';
import FilterPanel from '../../components/filter/Filter';
import StatisticsPanel from '../../components/statistics/Statistics';
import Search from '../../components/search/Search';
import ErrorBox from '../../components/error/ErrorBox';

import {convertCSVToArray, convertJSONToArray} from '../../utils/converters';
import {filterArrayByValueInProperty, filterArrayBasedOnOption} from '../../utils/filters';
import {sortByProperty} from '../../utils/sort';
import {FILTER_OPTIONS, DROPDOWN_OPTIONS} from '../../utils/constants';

import styles from './Feed.module.css';

function Feed() {
	const {state, setEmployees} = useEmployee();
	const [employeeArray, setEmployeeArray] = useState([]);

	const [searchValue, setSearchValue] = useState('');
	const [searchOption, setSearchOption] = useState(null);
	const [filterValue, setFilterValue] = useState('none');
	const [sortValue, setSortValue] = useState('none');

	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		setEmployeeArray(state);
	}, [state]);

	const handleFileUpload = e => {
		e.preventDefault();
		const file = e.target.files[0];
		if (!file) return;

		const fileExtension = file.name.split('.').pop().toLowerCase();
		const reader = new FileReader();

		if (fileExtension === 'csv') {
			reader.onload = e => {
				const array = convertCSVToArray(reader.result);
				setEmployeeArray(array);
				setEmployees(array);
			};
		} else if (fileExtension === 'json') {
			reader.onload = e => {
				const array = convertJSONToArray(reader.result);
				setEmployeeArray(array);
				setEmployees(array);
			};
		} else {
			setErrorMessage('Not supported file type');
		}

		reader.readAsText(e.target.files[0]);

		setFilterValue('none');
		setSortValue('none');
		setErrorMessage(null);
	};

	function handleFilterChange(value) {
		let array = filterArrayBasedOnOption(state, value);

		if (sortValue !== 'none') {
			array = sortByProperty(array, sortValue);
		}
		setEmployeeArray(array);

		setFilterValue(value);
		setErrorMessage(null);
	}

	function handleResetFilters() {
		setFilterValue('none');
		setEmployeeArray(state);
	}

	function handleSortOption(value) {
		if (!value) {
			setErrorMessage('Not supported sort type');
			return;
		}
		setSortValue(value);

		const array = filterArrayBasedOnOption(state, filterValue);
		setEmployeeArray(sortByProperty(array, value));
	}

	function handleSearchOption(value) {
		const option = value;

		if (!option) {
			setErrorMessage('Not supported search type');
			return;
		}

		if (option === 'none') {
			return;
		}

		const array = filterArrayBasedOnOption(state, filterValue);
		const filteredArray = filterArrayByValueInProperty(array, option, searchValue);
		setEmployeeArray(filteredArray);

		setSearchOption(option);
		setErrorMessage(null);
	}

	function handleSearchInputChange(e) {
		const value = e.target.value;

		console.log('value', value);
		console.log('searchValue', searchValue);

		if (state.length === 0 || !searchOption) {
			return;
		}

		const array = filterArrayBasedOnOption(state, filterValue);
		const filteredArray = filterArrayByValueInProperty(array, searchOption, value);
		setEmployeeArray(filteredArray);

		setSearchValue(value);
	}

	return (
		<div className={styles.container}>
			{!!errorMessage && <ErrorBox message={errorMessage} />}

			<FileInput uploadHandler={handleFileUpload} />

			<Search
				options={DROPDOWN_OPTIONS}
				selectHandler={handleSearchOption}
				changeHandler={handleSearchInputChange}
			/>

			{!!employeeArray && (
				<div className={styles.content}>
					<div className={styles.filter}>
						<FilterPanel
							options={FILTER_OPTIONS}
							filterHandler={handleFilterChange}
							resetHandler={handleResetFilters}
						/>
					</div>

					<div className={styles.employees}>
						<EmployeeList
							employees={employeeArray}
							selectHandler={handleSortOption}
						/>
					</div>

					<div className={styles.stats}>
						<StatisticsPanel />
					</div>
				</div>
			)}
		</div>
	);
}

export default Feed;
