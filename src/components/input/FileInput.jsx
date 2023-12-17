import styles from './Input.module.css';

function FileInput({uploadHandler}) {
	return (
		<div className={styles.fileInput}>
			<label>Upload CSV/JSON</label>

			<input
				type='file'
				onChange={uploadHandler}
			/>
		</div>
	);
}

export default FileInput;
