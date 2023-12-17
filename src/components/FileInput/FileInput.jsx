import styles from './FileInput.module.css';

function FileInput({uploadHandler}) {
	return (
		<div className={styles.container}>
			<div className={styles.inputs}>
				<label>Upload CSV/JSON</label>
				<input
					type='file'
					onChange={uploadHandler}
				/>
			</div>
		</div>
	);
}

export default FileInput;
