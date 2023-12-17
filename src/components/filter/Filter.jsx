import {useState} from 'react';
import RadioInput from '../input/RadioInput';
import styles from './Filter.module.css';

function FilterPanel({options, filterHandler, resetHandler}) {
	const [selectedValue, setSelectedValue] = useState(null);

	function handleRadioChange(value) {
		setSelectedValue(value);
		filterHandler(value);
	}

	function handleResetFilters() {
		setSelectedValue(null);
		resetHandler();
	}

	return (
		<div className={styles.container}>
			<h3>FILTER BY</h3>

			<div className={styles.inputs}>
				{options.map((option, index) => (
					<RadioInput
						key={index}
						label={option.label}
						value={option.value}
						checked={option.value === selectedValue}
						changeHandler={handleRadioChange}
					/>
				))}
			</div>

			<button
				className={styles.reset}
				onClick={handleResetFilters}
			>
				RESET
			</button>
		</div>
	);
}

export default FilterPanel;
