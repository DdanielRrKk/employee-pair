import {useState} from 'react';
import {convertCSVToArray, sanitazeArray} from '../../utils/converters';
import styles from './Home.module.css';

function Home() {
	const [dataArray, setDataArray] = useState([]);

	const handleFileUpload = e => {
		e.preventDefault();
		const file = e.target.files[0];

		if (!file) return;

		const fileExtension = file.name.split('.').pop().toLowerCase();
		console.log(fileExtension);

		const reader = new FileReader();
		switch (fileExtension) {
			case 'csv':
				reader.onload = e => {
					const array = convertCSVToArray(reader.result);
					setDataArray(array);
				};
				break;

			case 'json':
				reader.onload = e => {
					const array = JSON.parse(reader.result);
					setDataArray(array);
				};
				break;

			default:
				console.log('Invalid file type');
				break;
		}

		reader.readAsText(e.target.files[0]);
	};

	return (
		<div className={styles.container}>
			<h1>Employee Pairs</h1>

			<div className='inputs'>
				<label>Upload CSV/JSON</label>
				<input
					type='file'
					onChange={handleFileUpload}
				/>
			</div>
		</div>
	);
}

export default Home;
