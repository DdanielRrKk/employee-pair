import styles from './ErrorBox.module.css';

function ErrorBox({message}) {
	return (
		<div className={styles.error}>
			<p>{message}</p>
		</div>
	);
}

export default ErrorBox;
