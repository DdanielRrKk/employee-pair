import {useEffect, useState} from 'react';
import {useEmployee} from '../../hooks/useEmployees';

import FileInput from '../../components/input/FileInput';
import EmployeeList from '../../components/list/EmployeeList';
import FilterPanel from '../../components/filter/Filter';
import StatisticsPanel from '../../components/statistics/Statistics';

import {convertCSVToArray, convertJSONToArray} from '../../utils/converters';
import {
	filterArrayOnlyCurrentlyWorking,
	filterarrayOnlyNotWorking,
	filterArrayByValueInProperty,
} from '../../utils/filters';
import {FILTER_OPTIONS, DROPDOWN_OPTIONS} from '../../utils/constants';
import {sortByProperty} from '../../utils/sort';

import styles from './Feed.module.css';
import Search from '../../components/search/Search';
import ErrorBox from '../../components/error/ErrorBox';

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

	useEffect(() => {
		if (searchValue === '') {
			setEmployeeArray(state);
		}

		if (state.length === 0 || !searchValue || !searchOption) {
			return;
		}
		setEmployeeArray(filterArrayByValueInProperty(state, searchOption, searchValue));
	}, [searchValue, searchOption, state]);

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
		setErrorMessage(null);
	};

	function handleFilterChange(selectedValue) {
		switch (selectedValue) {
			case 'working':
				setEmployeeArray(filterArrayOnlyCurrentlyWorking(state));
				break;
			case 'notWorking':
				setEmployeeArray(filterarrayOnlyNotWorking(state));
				break;
			default:
				setErrorMessage('Not supported filter type');
				return;
		}

		setFilterValue(selectedValue);
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

		if (value === 'none') {
			setEmployeeArray(state);
			return;
		}

		const sortedArray = sortByProperty(state, value);
		setEmployees(sortedArray);
		setEmployeeArray(sortedArray);
	}

	function handleSearchOption(value) {
		if (!value) {
			setErrorMessage('Not supported search type');
			return;
		}
		setSearchOption(value);
		setErrorMessage(null);
	}

	function handleSearchInputChange(e) {
		setSearchValue(e.target.value);
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
					<FilterPanel
						options={FILTER_OPTIONS}
						filterHandler={handleFilterChange}
						resetHandler={handleResetFilters}
					/>

					<EmployeeList
						employees={employeeArray}
						selectHandler={handleSortOption}
					/>

					<StatisticsPanel />
				</div>
			)}
		</div>
	);
}

export default Feed;
