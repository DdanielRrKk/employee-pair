import styles from './Input.module.css';

function FileInput({uploadHandler}) {
	return (
		<div className={styles.fileInput}>
			<label>
				Upload CSV/JSON{' '}
				<input
					type='file'
					onChange={uploadHandler}
				/>
			</label>
		</div>
	);
}

export default FileInput;
