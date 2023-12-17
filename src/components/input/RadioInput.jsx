import styles from './Input.module.css';

function RadioInput({label, value, checked, changeHandler}) {
	function handleChange() {
		changeHandler(value);
	}

	return (
		<div className={styles.radioInput}>
			<label>
				<input
					type='radio'
					value={value}
					checked={checked}
					onChange={handleChange}
				/>
				{` ${label}`}
			</label>
		</div>
	);
}

export default RadioInput;
