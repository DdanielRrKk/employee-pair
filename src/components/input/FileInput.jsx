import {useRef} from 'react';
import styles from './Input.module.css';

function FileInput({uploadHandler}) {
	const fileInputRef = useRef(null);

	function handleButtonClick() {
		fileInputRef.current.click();
	}

	return (
		<div className={styles.fileInput}>
			<label>
				Upload CSV/JSON{' '}
				<input
					type='file'
					ref={fileInputRef}
					onChange={uploadHandler}
					accept='.csv, application/json'
				/>
			</label>
			<div
				className={styles.button}
				onClick={handleButtonClick}
			>
				Browse
			</div>
		</div>
	);
}

export default FileInput;
