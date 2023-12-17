import {useState, useEffect} from 'react';

import {convertCSVToArray, convertJSONToArray} from '../../utils/converters';
import {getLongestWorkingEmployeePair} from '../../utils/analizers';

import StatisticsPanel from '../../components/StatisticsPanel/StatisticsPanel';
import FileInput from '../../components/FileInput/FileInput';
import EmployeeTable from '../../components/table/EmployeeTable/EmployeeTable';

import styles from './Home.module.css';

function Home() {
	const [employeeArray, setEmployeeArray] = useState([]);
	const [longestWorkingEmployeePair, setLongestWorkingEmployeePair] = useState(null);

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
				};
				break;
			case 'json':
				reader.onload = e => {
					const array = convertJSONToArray(reader.result);
					setEmployeeArray(array);
				};
				break;
			default:
				throw new Error('Not supported file type');
		}
		reader.readAsText(e.target.files[0]);
	};

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h1>Employee Pairs</h1>
				<FileInput uploadHandler={handleFileUpload} />

				{!!employeeArray && (
					<>
						<StatisticsPanel pair={longestWorkingEmployeePair} />

						<div>
							<h2>Employee List</h2>
							<EmployeeTable employees={employeeArray} />
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default Home;
