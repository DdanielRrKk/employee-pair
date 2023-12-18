import {useEffect, useState} from 'react';
import {useEmployee} from '../../hooks/useEmployees';

import FileInput from '../../components/input/FileInput';
import EmployeeList from '../../components/list/EmployeeList';
import FilterPanel from '../../components/filter/Filter';

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

function Feed() {
	const {state, setEmployees} = useEmployee();
	const [employeeArray, setEmployeeArray] = useState([]);

	const [searchValue, setSearchValue] = useState('');
	const [searchOption, setSearchOption] = useState(null);
	const [filterValue, setFilterValue] = useState('none');
	const [sortValue, setSortValue] = useState('none');

	useEffect(() => {
		setEmployeeArray(state);
	}, []);

	useEffect(() => {
		if (state.length === 0 || !searchValue || !searchOption) {
			return;
		}
		setEmployeeArray(filterArrayByValueInProperty(state, searchOption, searchValue));
	}, [searchValue, searchOption]);

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
			throw new Error('Not supported file type');
		}

		reader.readAsText(e.target.files[0]);
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
				throw new Error('Not supported filter type');
		}

		setFilterValue(selectedValue);
	}

	function handleResetFilters() {
		setFilterValue('none');
		setEmployeeArray(state);
	}

	function handleSortOption(value) {
		if (!value) {
			throw new Error('Not supported sort type');
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
			throw new Error('Not supported search type');
		}
		setSearchOption(value);
	}

	function handleSearchInputChange(e) {
		setSearchValue(e.target.value);
	}

	return (
		<div className={styles.container}>
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
				</div>
			)}
		</div>
	);
}

export default Feed;
